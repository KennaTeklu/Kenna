String formatDuration(double seconds) {
  if (seconds.isNaN || seconds.isInfinite || seconds < 0) return '0:00';
  int h = seconds ~/ 3600;
  int m = (seconds % 3600) ~/ 60;
  int s = (seconds % 60).toInt();
  if (h > 0) {
    return '$h:${m.toString().padLeft(2, '0')}:${s.toString().padLeft(2, '0')}';
  }
  return '$m:${s.toString().padLeft(2, '0')}';
}