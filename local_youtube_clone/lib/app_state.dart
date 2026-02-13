import 'package:flutter/material.dart';
import '../models/video.dart';
import '../models/category.dart';
import '../services/database_service.dart';

class AppState extends ChangeNotifier {
  List<Video> _videos = [];
  Category _categories = Category(name: 'root');
  List<List<String>> _subscribedCategories = [];
  List<int> _watchHistory = [];
  int _channelSubscribers = 0;
  String _currentSearchTerm = '';
  String? _selectedCategoryFilter;

  List<Video> get videos => _videos;
  Category get categories => _categories;
  List<List<String>> get subscribedCategories => _subscribedCategories;
  List<int> get watchHistory => _watchHistory;
  int get channelSubscribers => _channelSubscribers;
  String get currentSearchTerm => _currentSearchTerm;
  String? get selectedCategoryFilter => _selectedCategoryFilter;

  final DatabaseService _db = DatabaseService();

  Future<void> loadData() async {
    _videos = await _db.getAllVideos();
    _categories = await _db.getCategories();
    _subscribedCategories = await _db.getSubscribedCategories();
    _watchHistory = await _db.getWatchHistory();
    _channelSubscribers = await _db.getChannelSubscribers();
    notifyListeners();
  }

  void setVideos(List<Video> videos) {
    _videos = videos;
    notifyListeners();
  }

  void addVideo(Video video) {
    _videos.add(video);
    _db.insertVideo(video);
    notifyListeners();
  }

  void updateVideo(Video video) {
    int index = _videos.indexWhere((v) => v.id == video.id);
    if (index != -1) {
      _videos[index] = video;
      _db.updateVideo(video);
      notifyListeners();
    }
  }

  void deleteVideo(int id) {
    _videos.removeWhere((v) => v.id == id);
    _db.deleteVideo(id);
    notifyListeners();
  }

  void setCategories(Category categories) {
    _categories = categories;
    _db.saveCategories(categories);
    notifyListeners();
  }

  void setSubscribedCategories(List<List<String>> subs) {
    _subscribedCategories = subs;
    _db.saveSubscribedCategories(subs);
    notifyListeners();
  }

  void setWatchHistory(List<int> history) {
    _watchHistory = history;
    _db.saveWatchHistory(history);
    notifyListeners();
  }

  void setChannelSubscribers(int count) {
    _channelSubscribers = count;
    _db.setChannelSubscribers(count);
    notifyListeners();
  }

  void setSearchTerm(String term) {
    _currentSearchTerm = term;
    notifyListeners();
  }

  void setCategoryFilter(String? filter) {
    _selectedCategoryFilter = filter;
    notifyListeners();
  }

  bool isSubscribedToCategory(List<String> path) {
    String pathStr = path.join(' › ');
    return _subscribedCategories.any((sub) => sub.join(' › ').startsWith(pathStr));
  }

  void toggleCategorySubscription(List<String> path) {
    String pathStr = path.join(' › ');
    int index = _subscribedCategories.indexWhere((sub) => sub.join(' › ') == pathStr);
    if (index == -1) {
      _subscribedCategories.add(path);
    } else {
      _subscribedCategories.removeAt(index);
    }
    _db.saveSubscribedCategories(_subscribedCategories);
    notifyListeners();
  }
}