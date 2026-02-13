import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../app_state.dart';
import '../widgets/video_grid.dart';

class SubscriptionsScreen extends StatelessWidget {
  const SubscriptionsScreen({super.key});

  @override
  Widget build(BuildContext context) {
    final appState = context.watch<AppState>();
    final subscribedVideos = appState.videos.where((v) {
      return appState.subscribedCategories.any((sub) => v.categoryPath.join(' › ').startsWith(sub.join(' › ')));
    }).toList();

    return Scaffold(
      appBar: AppBar(title: const Text('Subscriptions')),
      body: subscribedVideos.isEmpty
          ? const Center(child: Text('No subscribed categories'))
          : VideoGrid(), // Need to modify VideoGrid to accept custom list
    );
  }
}