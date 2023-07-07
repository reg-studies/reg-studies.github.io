// Imposta la tua chiave API YouTube
var apiKey = 'AIzaSyCSe3Q8YAtkL7YoBPTm1HU0cYN8F3gHTX8';

// Imposta l'ID del canale YouTube desiderato
var channelId = 'UCCZd9y6cnbNUl45-rs5iVPA';

// Imposta il numero massimo di video da visualizzare
var maxResults = 3;

// Funzione per creare l'elemento <iframe> per il video
function createVideoElement(video) {
    var videoId = video.id.videoId;
  
    // Crea l'elemento <iframe> per il video
    var videoElement = document.createElement('iframe');
    videoElement.src = 'https://www.youtube.com/embed/' + videoId;
    videoElement.width = '100%';
    videoElement.height = '100%';
    videoElement.frameBorder = '0';
    videoElement.allow = 'autoplay; encrypted-media';
    videoElement.allowFullscreen = true;
  
    return videoElement;
  }
  
  // Funzione di callback per gestire la risposta dell'API
  function handleResponse(response) {
    // Rimuovi i video precedenti, se presenti
    var videoContainers = document.querySelectorAll('.video-container');
    videoContainers.forEach(function(container) {
      container.innerHTML = '';
    });
  
    // Itera sui video e crea gli elementi <iframe> per visualizzarli
    for (var i = 0; i < response.items.length; i++) {
      var video = response.items[i];
      var videoElement = createVideoElement(video);
  
      // Aggiungi l'elemento del video al contenitore corrispondente
      var containerId = 'video-container-' + (i + 1);
      var videoContainer = document.getElementById(containerId);
      videoContainer.appendChild(videoElement);
    }
  }
  
  // Effettua la chiamata all'API YouTube per ottenere i video più recenti
  var url = 'https://www.googleapis.com/youtube/v3/search?order=date&part=snippet&channelId=' + channelId + '&maxResults=' + maxResults + '&key=' + apiKey;
  
  // Effettua la richiesta HTTP per ottenere i video
  fetch(url)
    .then(function(response) {
      return response.json();
    })
    .then(function(data) {
      handleResponse(data);
    })
    .catch(function(error) {
      console.log(error);
    });