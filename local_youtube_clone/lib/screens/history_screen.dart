import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../app_state.dart';
import '../widgets/video_grid.dart';

class HistoryScreen extends StatelessWidget {
  const HistoryScreen({super.key});

  @override
  Widget build(BuildContext context) {
    final appState = context.watch<AppState>();
    final historyVideos = appState.watchHistory.map((id) => appState.videos.firstWhere((v) => v.id == id)).toList();

    return Scaffold(
      appBar: AppBar(title: const Text('History')),
      body: historyVideos.isEmpty
          ? const Center(child: Text('No watch history'))
          : VideoGrid(), // Modify to use historyVideos
    );
  }
}