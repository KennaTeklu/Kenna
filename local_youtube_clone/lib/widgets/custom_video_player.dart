import 'package:flutter/material.dart';
import 'package:video_player/video_player.dart';
import '../utils/format_duration.dart';

class CustomVideoPlayer extends StatefulWidget {
  final VideoPlayerController controller;

  const CustomVideoPlayer({super.key, required this.controller});

  @override
  State<CustomVideoPlayer> createState() => _CustomVideoPlayerState();
}

class _CustomVideoPlayerState extends State<CustomVideoPlayer> {
  bool _showControls = true;
  double _volume = 1.0;

  @override
  void initState() {
    super.initState();
    widget.controller.addListener(_updateState);
  }

  @override
  void dispose() {
    widget.controller.removeListener(_updateState);
    super.dispose();
  }

  void _updateState() {
    setState(() {});
  }

  void _togglePlayPause() {
    if (widget.controller.value.isPlaying) {
      widget.controller.pause();
    } else {
      widget.controller.play();
    }
  }

  void _seekTo(double value) {
    widget.controller.seekTo(Duration(seconds: value.toInt()));
  }

  void _setVolume(double value) {
    setState(() {
      _volume = value;
    });
    widget.controller.setVolume(value);
  }

  @override
  Widget build(BuildContext context) {
    return AspectRatio(
      aspectRatio: 16 / 9,
      child: Stack(
        children: [
          VideoPlayer(widget.controller),
          GestureDetector(
            onTap: () {
              setState(() {
                _showControls = !_showControls;
              });
            },
            child: Container(
              color: Colors.transparent,
              child: _showControls ? _buildControls() : null,
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildControls() {
    return Container(
      decoration: const BoxDecoration(
        gradient: LinearGradient(
          begin: Alignment.topCenter,
          end: Alignment.bottomCenter,
          colors: [Colors.transparent, Colors.black54],
        ),
      ),
      child: Column(
        mainAxisAlignment: MainAxisAlignment.end,
        children: [
          // Progress bar
          Slider(
            value: widget.controller.value.position.inSeconds.toDouble(),
            max: widget.controller.value.duration.inSeconds.toDouble(),
            onChanged: _seekTo,
          ),
          Row(
            children: [
              IconButton(
                icon: Icon(
                  widget.controller.value.isPlaying ? Icons.pause : Icons.play_arrow,
                ),
                onPressed: _togglePlayPause,
              ),
              Text(
                '${formatDuration(widget.controller.value.position.inSeconds.toDouble())} / ${formatDuration(widget.controller.value.duration.inSeconds.toDouble())}',
              ),
              const Spacer(),
              IconButton(
                icon: Icon(_volume > 0 ? Icons.volume_up : Icons.volume_off),
                onPressed: () {
                  _setVolume(_volume > 0 ? 0 : 1.0);
                },
              ),
              Slider(
                value: _volume,
                onChanged: _setVolume,
                min: 0,
                max: 1,
              ),
              IconButton(
                icon: const Icon(Icons.fullscreen),
                onPressed: () {
                  // Toggle fullscreen
                },
              ),
            ],
          ),
        ],
      ),
    );
  }
}