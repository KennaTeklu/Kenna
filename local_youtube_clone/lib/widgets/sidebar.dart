import 'package:flutter/material.dart';

class Sidebar extends StatelessWidget {
  final int selectedIndex;
  final Function(int) onItemSelected;

  const Sidebar({super.key, required this.selectedIndex, required this.onItemSelected});

  @override
  Widget build(BuildContext context) {
    return Drawer(
      child: ListView(
        children: [
          const DrawerHeader(
            child: Text('Local YouTube', style: TextStyle(fontSize: 24)),
          ),
          ListTile(
            leading: const Icon(Icons.home),
            title: const Text('Home'),
            selected: selectedIndex == 0,
            onTap: () => onItemSelected(0),
          ),
          ListTile(
            leading: const Icon(Icons.video_library),
            title: const Text('Shorts'),
            selected: selectedIndex == 1,
            onTap: () => onItemSelected(1),
          ),
          ListTile(
            leading: const Icon(Icons.subscriptions),
            title: const Text('Subscriptions'),
            selected: selectedIndex == 2,
            onTap: () => onItemSelected(2),
          ),
          ListTile(
            leading: const Icon(Icons.history),
            title: const Text('History'),
            selected: selectedIndex == 3,
            onTap: () => onItemSelected(3),
          ),
          const Divider(),
          // Categories will be added here
        ],
      ),
    );
  }
}