import 'dart:io';
import 'package:file_picker/file_picker.dart';
import 'package:video_player/video_player.dart';
import 'package:path/path.dart' as p;
import '../models/video.dart';
import '../services/database_service.dart';
import '../services/thumbnail_service.dart';

class VideoService {
  final DatabaseService _db = DatabaseService();

  Future<List<Video>> loadVideos() async {
    return await _db.getAllVideos();
  }

  Future<void> addVideos(List<File> files, {List<String> categoryPath = const ['Uncategorized']}) async {
    List<Video> videos = [];
    int nextId = await _getNextId();

    for (File file in files) {
      String name = p.basenameWithoutExtension(file.path);
      String url = file.path;
      double duration = await _getVideoDuration(file);
      bool isShort = duration < 120;
      String thumbnailPath = await ThumbnailService.generateThumbnail(file.path);
      Video video = Video(
        id: nextId++,
        name: name,
        url: url,
        thumbnailPath: thumbnailPath,
        duration: duration,
        isShort: isShort,
        categoryPath: categoryPath,
        added: DateTime.now(),
      );
      videos.add(video);
      await _db.insertVideo(video);
    }
  }

  Future<int> _getNextId() async {
    List<Video> videos = await _db.getAllVideos();
    if (videos.isEmpty) return 1;
    return videos.map((v) => v.id).reduce((a, b) => a > b ? a : b) + 1;
  }

  Future<double> _getVideoDuration(File file) async {
    VideoPlayerController controller = VideoPlayerController.file(file);
    await controller.initialize();
    double duration = controller.value.duration.inSeconds.toDouble();
    controller.dispose();
    return duration;
  }

  Future<void> deleteVideo(int id) async {
    Video? video = (await _db.getAllVideos()).firstWhere((v) => v.id == id);
    if (video != null) {
      File(video.url).deleteSync();
      File(video.thumbnailPath).deleteSync();
    }
    await _db.deleteVideo(id);
  }

  Future<void> updateVideo(Video video) async {
    await _db.updateVideo(video);
  }

  Future<List<File>> pickVideos() async {
    FilePickerResult? result = await FilePicker.platform.pickFiles(
      type: FileType.video,
      allowMultiple: true,
    );
    if (result != null) {
      return result.files.map((file) => File(file.path!)).toList();
    }
    return [];
  }

  Future<List<File>> pickFolder() async {
    String? selectedDirectory = await FilePicker.platform.getDirectoryPath();
    if (selectedDirectory != null) {
      Directory dir = Directory(selectedDirectory);
      List<FileSystemEntity> entities = dir.listSync(recursive: true);
      return entities.whereType<File>().where((file) => file.path.endsWith('.mp4') || file.path.endsWith('.mov') || file.path.endsWith('.avi')).toList();
    }
    return [];
  }
}