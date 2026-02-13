import 'dart:io';
import 'package:video_thumbnail/video_thumbnail.dart';
import 'package:path_provider/path_provider.dart';
import 'package:path/path.dart' as p;

class ThumbnailService {
  static Future<String> generateThumbnail(String videoPath) async {
    Directory tempDir = await getTemporaryDirectory();
    String thumbnailPath = p.join(tempDir.path, '${DateTime.now().millisecondsSinceEpoch}.jpg');
    await VideoThumbnail.thumbnailFile(
      video: videoPath,
      thumbnailPath: thumbnailPath,
      imageFormat: ImageFormat.JPEG,
      maxHeight: 180,
      quality: 75,
    );
    return thumbnailPath;
  }
}