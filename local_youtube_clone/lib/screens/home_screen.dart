import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../app_state.dart';
import '../widgets/video_grid.dart';
import '../widgets/shorts_shelf.dart';
import '../widgets/sidebar.dart';
import '../widgets/chips_bar.dart';
import '../services/video_service.dart';
import '../screens/subscriptions_screen.dart';
import '../screens/history_screen.dart';

class HomeScreen extends StatefulWidget {
  const HomeScreen({super.key});

  @override
  State<HomeScreen> createState() => _HomeScreenState();
}

class _HomeScreenState extends State<HomeScreen> {
  int _selectedIndex = 0;
  final VideoService _videoService = VideoService();

  @override
  void initState() {
    super.initState();
    WidgetsBinding.instance.addPostFrameCallback((_) {
      context.read<AppState>().loadData();
    });
  }

  void _onItemTapped(int index) {
    setState(() {
      _selectedIndex = index;
    });
  }

  Widget _buildBody() {
    switch (_selectedIndex) {
      case 0: // Home
        return const HomeContent();
      case 1: // Shorts - for now same as home
        return const HomeContent();
      case 2: // Subscriptions
        return const SubscriptionsScreen();
      case 3: // You - history
        return const HistoryScreen();
      default:
        return const HomeContent();
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Local YouTube'),
        actions: [
          IconButton(
            icon: const Icon(Icons.search),
            onPressed: () {
              // Show search bar
              showSearch(context: context, delegate: VideoSearchDelegate());
            },
          ),
          IconButton(
            icon: const Icon(Icons.add),
            onPressed: () {
              // Add video
              _showAddMenu(context);
            },
          ),
        ],
      ),
      drawer: Sidebar(
        selectedIndex: _selectedIndex,
        onItemSelected: _onItemTapped,
      ),
      body: _buildBody(),
    );
  }

  void _showAddMenu(BuildContext context) {
    showModalBottomSheet(
      context: context,
      builder: (context) {
        return Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            ListTile(
              leading: const Icon(Icons.video_file),
              title: const Text('Add Videos'),
              onTap: () {
                Navigator.pop(context);
                // Pick videos
                _pickVideos();
              },
            ),
            ListTile(
              leading: const Icon(Icons.folder),
              title: const Text('Add Folder'),
              onTap: () {
                Navigator.pop(context);
                // Pick folder
                _pickFolder();
              },
            ),
          ],
        );
      },
    );
  }

  void _pickVideos() async {
    final files = await _videoService.pickVideos();
    if (files.isNotEmpty) {
      await _videoService.addVideos(files);
      context.read<AppState>().loadData();
    }
  }

  void _pickFolder() async {
    final files = await _videoService.pickFolder();
    if (files.isNotEmpty) {
      await _videoService.addVideos(files);
      context.read<AppState>().loadData();
    }
  }
}

class HomeContent extends StatelessWidget {
  const HomeContent({super.key});

  @override
  Widget build(BuildContext context) {
    return SingleChildScrollView(
      child: Column(
        children: [
          const ChipsBar(),
          const ShortsShelf(),
          const VideoGrid(),
        ],
      ),
    );
  }
}

class VideoSearchDelegate extends SearchDelegate {
  @override
  List<Widget> buildActions(BuildContext context) {
    return [
      IconButton(
        icon: const Icon(Icons.clear),
        onPressed: () {
          query = '';
        },
      ),
    ];
  }

  @override
  Widget buildLeading(BuildContext context) {
    return IconButton(
      icon: const Icon(Icons.arrow_back),
      onPressed: () {
        close(context, null);
      },
    );
  }

  @override
  Widget buildResults(BuildContext context) {
    context.read<AppState>().setSearchTerm(query);
    return const VideoGrid();
  }

  @override
  Widget buildSuggestions(BuildContext context) {
    return Container();
  }
}