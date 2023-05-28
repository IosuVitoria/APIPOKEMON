window.addEventListener('DOMContentLoaded', function() {
    var audio = new Audio('assets/music.mp3');
  
    audio.addEventListener('ended', function() {
      audio.currentTime = 0; // Reinicia la reproducción al finalizar
      audio.play();
    });
  
    audio.play();
});