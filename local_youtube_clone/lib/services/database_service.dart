import 'dart:convert';
import 'package:sqflite/sqflite.dart';
import 'package:path/path.dart';
import '../models/video.dart';
import '../models/category.dart';

class DatabaseService {
  static final DatabaseService _instance = DatabaseService._internal();
  factory DatabaseService() => _instance;
  DatabaseService._internal();

  Database? _database;

  Future<Database> get database async {
    if (_database != null) return _database!;
    _database = await _initDatabase();
    return _database!;
  }

  Future<Database> _initDatabase() async {
    String path = join(await getDatabasesPath(), 'local_youtube.db');
    return await openDatabase(
      path,
      version: 1,
      onCreate: _onCreate,
    );
  }

  Future<void> _onCreate(Database db, int version) async {
    await db.execute('''
      CREATE TABLE videos (
        id INTEGER PRIMARY KEY,
        name TEXT,
        url TEXT,
        thumbnailPath TEXT,
        duration REAL,
        isShort INTEGER,
        views INTEGER,
        likes INTEGER,
        dislikes INTEGER,
        liked INTEGER,
        disliked INTEGER,
        categoryPath TEXT,
        added TEXT
      )
    ''');

    await db.execute('''
      CREATE TABLE settings (
        key TEXT PRIMARY KEY,
        value TEXT
      )
    ''');

    // Insert default category tree
    Category defaultTree = Category(
      name: 'root',
      children: [
        Category(name: 'Education', children: [
          Category(name: 'Books', children: [
            Category(name: 'Audiobooks', children: [
              Category(name: 'Engineering')
            ])
          ])
        ]),
        Category(name: 'Entertainment', children: [
          Category(name: 'Movies'),
          Category(name: 'Music')
        ]),
        Category(name: 'Uncategorized')
      ],
    );
    await db.insert('settings', {'key': 'categories', 'value': defaultTree.toJson()});
    await db.insert('settings', {'key': 'subscribedCategories', 'value': '[]'});
    await db.insert('settings', {'key': 'channelSubscribers', 'value': '0'});
    await db.insert('settings', {'key': 'watchHistory', 'value': '[]'});
  }

  Future<List<Video>> getAllVideos() async {
    Database db = await database;
    List<Map<String, dynamic>> maps = await db.query('videos');
    return maps.map((map) => Video.fromMap(map)).toList();
  }

  Future<void> insertVideo(Video video) async {
    Database db = await database;
    await db.insert('videos', video.toMap(), conflictAlgorithm: ConflictAlgorithm.replace);
  }

  Future<void> updateVideo(Video video) async {
    Database db = await database;
    await db.update('videos', video.toMap(), where: 'id = ?', whereArgs: [video.id]);
  }

  Future<void> deleteVideo(int id) async {
    Database db = await database;
    await db.delete('videos', where: 'id = ?', whereArgs: [id]);
  }

  Future<Category> getCategories() async {
    Database db = await database;
    List<Map<String, dynamic>> maps = await db.query('settings', where: 'key = ?', whereArgs: ['categories']);
    if (maps.isNotEmpty) {
      return Category.fromJson(maps.first['value']);
    }
    return Category(name: 'root');
  }

  Future<void> saveCategories(Category categories) async {
    Database db = await database;
    await db.update('settings', {'value': categories.toJson()}, where: 'key = ?', whereArgs: ['categories']);
  }

  Future<List<List<String>>> getSubscribedCategories() async {
    Database db = await database;
    List<Map<String, dynamic>> maps = await db.query('settings', where: 'key = ?', whereArgs: ['subscribedCategories']);
    if (maps.isNotEmpty) {
      List<dynamic> list = jsonDecode(maps.first['value']);
      return list.map((e) => List<String>.from(e)).toList();
    }
    return [];
  }

  Future<void> saveSubscribedCategories(List<List<String>> subs) async {
    Database db = await database;
    await db.update('settings', {'value': jsonEncode(subs)}, where: 'key = ?', whereArgs: ['subscribedCategories']);
  }

  Future<int> getChannelSubscribers() async {
    Database db = await database;
    List<Map<String, dynamic>> maps = await db.query('settings', where: 'key = ?', whereArgs: ['channelSubscribers']);
    if (maps.isNotEmpty) {
      return int.parse(maps.first['value']);
    }
    return 0;
  }

  Future<void> setChannelSubscribers(int count) async {
    Database db = await database;
    await db.update('settings', {'value': count.toString()}, where: 'key = ?', whereArgs: ['channelSubscribers']);
  }

  Future<List<int>> getWatchHistory() async {
    Database db = await database;
    List<Map<String, dynamic>> maps = await db.query('settings', where: 'key = ?', whereArgs: ['watchHistory']);
    if (maps.isNotEmpty) {
      List<dynamic> list = jsonDecode(maps.first['value']);
      return list.map((e) => e as int).toList();
    }
    return [];
  }

  Future<void> saveWatchHistory(List<int> history) async {
    Database db = await database;
    await db.update('settings', {'value': jsonEncode(history)}, where: 'key = ?', whereArgs: ['watchHistory']);
  }
}