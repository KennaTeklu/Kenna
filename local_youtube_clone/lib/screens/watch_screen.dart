import 'dart:io';
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:video_player/video_player.dart';
import '../app_state.dart';
import '../models/video.dart';
import '../widgets/custom_video_player.dart';
import '../utils/format_duration.dart';

class WatchScreen extends StatefulWidget {
  final Video video;

  const WatchScreen({super.key, required this.video});

  @override
  State<WatchScreen> createState() => _WatchScreenState();
}

class _WatchScreenState extends State<WatchScreen> {
  late VideoPlayerController _controller;
  bool _isLiked = false;
  bool _isDisliked = false;

  @override
  void initState() {
    super.initState();
    _controller = VideoPlayerController.file(File(widget.video.url))
      ..initialize().then((_) {
        setState(() {});
        _controller.play();
      });
    _isLiked = widget.video.liked;
    _isDisliked = widget.video.disliked;
  }

  @override
  void dispose() {
    _controller.dispose();
    super.dispose();
  }

  void _toggleLike() {
    setState(() {
      if (_isLiked) {
        widget.video.likes--;
        _isLiked = false;
      } else {
        if (_isDisliked) {
          widget.video.dislikes--;
          _isDisliked = false;
        }
        widget.video.likes++;
        _isLiked = true;
      }
    });
    context.read<AppState>().updateVideo(widget.video);
  }

  void _toggleDislike() {
    setState(() {
      if (_isDisliked) {
        widget.video.dislikes--;
        _isDisliked = false;
      } else {
        if (_isLiked) {
          widget.video.likes--;
          _isLiked = false;
        }
        widget.video.dislikes++;
        _isDisliked = true;
      }
    });
    context.read<AppState>().updateVideo(widget.video);
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Watch'),
        leading: IconButton(
          icon: const Icon(Icons.arrow_back),
          onPressed: () => Navigator.pop(context),
        ),
      ),
      body: SingleChildScrollView(
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            // Custom Video Player
            CustomVideoPlayer(controller: _controller),
            Padding(
              padding: const EdgeInsets.all(16),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(widget.video.name, style: const TextStyle(fontSize: 20, fontWeight: FontWeight.bold)),
                  const SizedBox(height: 8),
                  Text('${widget.video.views} views • ${formatDuration(widget.video.duration)}'),
                  const SizedBox(height: 16),
                  Row(
                    children: [
                      IconButton(
                        icon: Icon(_isLiked ? Icons.thumb_up : Icons.thumb_up_outlined),
                        onPressed: _toggleLike,
                      ),
                      Text('${widget.video.likes}'),
                      IconButton(
                        icon: Icon(_isDisliked ? Icons.thumb_down : Icons.thumb_down_outlined),
                        onPressed: _toggleDislike,
                      ),
                      const Spacer(),
                      IconButton(
                        icon: const Icon(Icons.share),
                        onPressed: () {},
                      ),
                    ],
                  ),
                  const SizedBox(height: 16),
                  const Text('Description: No description provided.'),
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }
}