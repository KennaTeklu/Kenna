import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../app_state.dart';

class ChipsBar extends StatelessWidget {
  const ChipsBar({super.key});

  @override
  Widget build(BuildContext context) {
    final appState = context.watch<AppState>();
    final categories = appState.categories.getTopLevel() + ['All'];

    return Container(
      height: 50,
      padding: const EdgeInsets.symmetric(horizontal: 16),
      child: ListView(
        scrollDirection: Axis.horizontal,
        children: categories.map((chip) {
          bool isActive = appState.selectedCategoryFilter == chip || (chip == 'All' && appState.selectedCategoryFilter == null);
          return Container(
            margin: const EdgeInsets.only(right: 8),
            child: FilterChip(
              label: Text(chip),
              selected: isActive,
              onSelected: (selected) {
                appState.setCategoryFilter(selected ? (chip == 'All' ? null : chip) : null);
              },
            ),
          );
        }).toList(),
      ),
    );
  }
}