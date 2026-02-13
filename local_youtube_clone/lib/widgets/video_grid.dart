import 'dart:io';
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../app_state.dart';
import '../models/video.dart';
import '../screens/watch_screen.dart';
import '../utils/format_duration.dart';

class VideoGrid extends StatelessWidget {
  const VideoGrid({super.key});

  @override
  Widget build(BuildContext context) {
    final appState = context.watch<AppState>();
    List<Video> videos = appState.videos.where((v) => !v.isShort).toList();

    // Filter by search
    if (appState.currentSearchTerm.isNotEmpty) {
      videos = videos.where((v) => v.name.toLowerCase().contains(appState.currentSearchTerm.toLowerCase())).toList();
    }

    // Filter by category
    if (appState.selectedCategoryFilter != null) {
      videos = videos.where((v) => v.categoryPath.contains(appState.selectedCategoryFilter!)).toList();
    }

    if (videos.isEmpty) {
      return const Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Icon(Icons.video_library, size: 80, color: Colors.grey),
            SizedBox(height: 16),
            Text('No videos yet', style: TextStyle(fontSize: 24)),
            Text('Tap the + button to add videos'),
          ],
        ),
      );
    }

    return GridView.builder(
      shrinkWrap: true,
      physics: const NeverScrollableScrollPhysics(),
      gridDelegate: const SliverGridDelegateWithMaxCrossAxisExtent(
        maxCrossAxisExtent: 300,
        childAspectRatio: 16 / 9,
        crossAxisSpacing: 8,
        mainAxisSpacing: 8,
      ),
      padding: const EdgeInsets.all(16),
      itemCount: videos.length,
      itemBuilder: (context, index) {
        final video = videos[index];
        return GestureDetector(
          onTap: () {
            Navigator.push(
              context,
              MaterialPageRoute(builder: (context) => WatchScreen(video: video)),
            );
          },
          child: Card(
            child: Column(
              children: [
                Expanded(
                  child: Stack(
                    children: [
                      Positioned.fill(
                        child: Image.file(File(video.thumbnailPath), fit: BoxFit.cover),
                      ),
                      Positioned(
                        bottom: 8,
                        right: 8,
                        child: Container(
                          padding: const EdgeInsets.symmetric(horizontal: 4, vertical: 2),
                          color: Colors.black54,
                          child: Text(
                            formatDuration(video.duration),
                            style: const TextStyle(color: Colors.white, fontSize: 12),
                          ),
                        ),
                      ),
                    ],
                  ),
                ),
                Padding(
                  padding: const EdgeInsets.all(8),
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text(video.name, maxLines: 2, overflow: TextOverflow.ellipsis),
                      Text('${video.views} views • ${formatDuration(video.duration)}', style: const TextStyle(color: Colors.grey)),
                    ],
                  ),
                ),
              ],
            ),
          ),
        );
      },
    );
  }
}