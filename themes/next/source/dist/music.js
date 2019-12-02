const ap = new APlayer({
    container: document.getElementById('aplayer'),
    fixed: true,
    autoplay: false,
    theme: '#FADFA3',
    audio: [
      {
        name: 'Breaking My Heart',
        artist: 'Lana',
        url: 'http://antiserver.kuwo.cn/anti.s?useless=/resource/&format=mp3&rid=MUSIC_22810058&response=res&type=convert_url&.mp3',
        cover: 'https://imgur.com/QE2JOlx.jpg',
      },
      {
        name: 'Never Let Me Go',
        artist: 'Lana',
        url: 'http://antiserver.kuwo.cn/anti.s?useless=/resource/&format=mp3&rid=MUSIC_1204308&response=res&type=convert_url&.mp3',
        cover: 'https://imgur.com/QE2JOlx.jpg',
      },
      {
        name: 'Damn you',
        artist: 'Lana',
        url: 'http://antiserver.kuwo.cn/anti.s?useless=/resource/&format=mp3&rid=MUSIC_2673419&response=res&type=convert_url&.mp3',
        cover: 'https://imgur.com/QE2JOlx.jpg',
      }
    ]
});