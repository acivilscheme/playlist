var audioPlayer = $("#id_playerAudio").get(0);
var albumSize = 0;
var currentTrack = 0;

$(document).ready(function(){
    var album = getAlbum("James Blake");
    albumSize = album.tracks.length - 1;
    
    loadPlaylist(album);
    setCurrentTrack($(".c_track").get(currentTrack));
    loadTrack(album.tracks[currentTrack].source);

    //When track is clicked, play the song
    $(".c_track").click(function(){
        setCurrentTrack($(this));
        var index = $(this).index();
        currentTrack = index;
        playTrack(album.tracks[index].source);
    });

    //When click previous button, go to previous track
    $("#id_prev").click(function(){
        currenTrack = $(".currentTrack").index();
        if(currentTrack > 0)
        {
            currentTrack--;
            var index = currentTrack;
            var tName = album.tracks[index].source;
            setCurrentTrack($(".c_track").get(currentTrack));
            loadTrack(tName);
            playTrack(tName);
        }
        else if(currentTrack == 0)
        {
            currentTrack = albumSize;
            var index = currentTrack;
            var tName = album.tracks[index].source;
            setCurrentTrack($(".c_track").get(currentTrack));
            loadTrack(tName);
            playTrack(tName);
        }
    });

    //When click next button, go to next track
    $("#id_next").click(function(){
        currenTrack = $(".currentTrack").index();
        if(currentTrack < albumSize)
        {
            currentTrack++;
            var index = currentTrack;
            var tName = album.tracks[index].source;
            setCurrentTrack($(".c_track").get(currentTrack));
            loadTrack(tName);
            playTrack(tName);
        }
        else if(currentTrack == albumSize)
        {
            currentTrack = 0;
            var index = currentTrack;
            var tName = album.tracks[index].source;
            setCurrentTrack($(".c_track").get(currentTrack));
            loadTrack(tName);
            playTrack(tName);
        }
    });

    //When song ends, go to next song or go to start
    $("#id_playerAudio").bind("ended", function(){
        currenTrack = $(".currentTrack").index();
        if(currentTrack < albumSize)
        {
            currentTrack++;
            var index = currentTrack;
            var tName = album.tracks[index].source;
            setCurrentTrack($(".c_track").get(currentTrack));
            loadTrack(tName);
            playTrack(tName);
        }
        else if(currentTrack == albumSize)
        {
            currentTrack = 0;
            var index = currentTrack;
            var tName = album.tracks[index].source;
            setCurrentTrack($(".c_track").get(currentTrack));
            loadTrack(tName);
            playTrack(tName);
        }
    });
});

//Gets album data such as track names, length, and source
function getAlbum(artistName)
{
    var artist = artistName;
    var album = "";

    switch(artist)
    {
        case "Nick Drake":
        {
            album = {
            "tracks": [
                {
                    "track": 01, 
                    "name": "Bryter Layer", 
                    "length": "3:24", 
                    "source": "media/bryter layter.mp3"
                },
                {
                    "track": 02, 
                    "name": "Things Behind the Sun", 
                    "length": "3:56", 
                    "source": "media/things behind the sun.mp3"
                },
                {
                    "track": 03, 
                    "name": "Three Hours", 
                    "length": "6:16", 
                    "source": "media/three hours.mp3"
                }
            ]};
            break;
        }
        case "James Blake":
        {
            album = {
            "tracks": [
                {
                    "track": 01, 
                    "name": "Radio Silence", 
                    "length": "4:00", 
                    "source": "media/01 Radio Silence.mp3"
                },
                {
                    "track": 02, 
                    "name": "Modern Soul", 
                    "length": "5:32", 
                    "source": "media/15 Modern Soul.mp3"
                },
                {
                    "track": 03, 
                    "name": "Always", 
                    "length": "5:04", 
                    "source": "media/16 Always.mp3"
                }
            ]};
            break;
        }
    }

    return album;
}

//Loads playlist to page
function loadPlaylist(albumName)
{
    for(i in albumName.tracks)
    {
        $("#id_playerPlaylist").children("ul").append("<li class='c_track'>" + 
            albumName.tracks[i].track + ") " +
            albumName.tracks[i].name + "<span style='float: right;'>" + albumName.tracks[i].length +"</span></li>");
    }
}

//Plays track
function playTrack(trackName)
{
    audioPlayer.src = trackName;
    audioPlayer.play();
}

//Pauses track and sets source to new track
function loadTrack(trackName)
{
    audioPlayer.pause();
    audioPlayer.src = trackName;
}

//Adds current Track class to element
function setCurrentTrack(cTrack)
{
    $(".currentTrack").removeClass("currentTrack");
    $(cTrack).addClass("currentTrack");
}