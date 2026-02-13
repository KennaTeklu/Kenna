import 'dart:convert';

class Video {
  final int id;
  final String name;
  final String url; // local file path
  final String thumbnailPath;
  final double duration;
  final bool isShort;
  int views;
  int likes;
  int dislikes;
  bool liked;
  bool disliked;
  final List<String> categoryPath;
  final DateTime added;

  Video({
    required this.id,
    required this.name,
    required this.url,
    required this.thumbnailPath,
    required this.duration,
    required this.isShort,
    this.views = 0,
    this.likes = 0,
    this.dislikes = 0,
    this.liked = false,
    this.disliked = false,
    required this.categoryPath,
    required this.added,
  });

  Map<String, dynamic> toMap() {
    return {
      'id': id,
      'name': name,
      'url': url,
      'thumbnailPath': thumbnailPath,
      'duration': duration,
      'isShort': isShort ? 1 : 0,
      'views': views,
      'likes': likes,
      'dislikes': dislikes,
      'liked': liked ? 1 : 0,
      'disliked': disliked ? 1 : 0,
      'categoryPath': jsonEncode(categoryPath),
      'added': added.toIso8601String(),
    };
  }

  factory Video.fromMap(Map<String, dynamic> map) {
    return Video(
      id: map['id'],
      name: map['name'],
      url: map['url'],
      thumbnailPath: map['thumbnailPath'],
      duration: map['duration'],
      isShort: map['isShort'] == 1,
      views: map['views'],
      likes: map['likes'],
      dislikes: map['dislikes'],
      liked: map['liked'] == 1,
      disliked: map['disliked'] == 1,
      categoryPath: List<String>.from(jsonDecode(map['categoryPath'])),
      added: DateTime.parse(map['added']),
    );
  }

  Video copyWith({
    int? id,
    String? name,
    String? url,
    String? thumbnailPath,
    double? duration,
    bool? isShort,
    int? views,
    int? likes,
    int? dislikes,
    bool? liked,
    bool? disliked,
    List<String>? categoryPath,
    DateTime? added,
  }) {
    return Video(
      id: id ?? this.id,
      name: name ?? this.name,
      url: url ?? this.url,
      thumbnailPath: thumbnailPath ?? this.thumbnailPath,
      duration: duration ?? this.duration,
      isShort: isShort ?? this.isShort,
      views: views ?? this.views,
      likes: likes ?? this.likes,
      dislikes: dislikes ?? this.dislikes,
      liked: liked ?? this.liked,
      disliked: disliked ?? this.disliked,
      categoryPath: categoryPath ?? this.categoryPath,
      added: added ?? this.added,
    );
  }
}