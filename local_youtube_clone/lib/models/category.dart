import 'dart:convert';

class Category {
  final String name;
  final List<Category> children;

  Category({required this.name, this.children = const []});

  factory Category.fromJson(String json) {
    Map<String, dynamic> map = jsonDecode(json);
    return Category.fromMap(map);
  }

  factory Category.fromMap(Map<String, dynamic> map) {
    return Category(
      name: map['name'],
      children: (map['children'] as List<dynamic>?)
              ?.map((e) => Category.fromMap(e))
              .toList() ??
          [],
    );
  }

  Map<String, dynamic> toMap() {
    return {
      'name': name,
      'children': children.map((e) => e.toMap()).toList(),
    };
  }

  String toJson() => jsonEncode(toMap());

  // Helper to find node by path
  Category? findNode(List<String> path) {
    if (path.isEmpty) return this;
    if (path.first == name) {
      if (path.length == 1) return this;
      for (var child in children) {
        var found = child.findNode(path.sublist(1));
        if (found != null) return found;
      }
    }
    return null;
  }

  // Add subcategory
  bool addSubcategory(List<String> parentPath, String newName) {
    var parent = findNode(parentPath);
    if (parent != null) {
      parent.children.add(Category(name: newName));
      return true;
    }
    return false;
  }

  // Get all top level names
  List<String> getTopLevel() {
    return children.map((e) => e.name).toList();
  }
}