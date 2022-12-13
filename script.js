//just for checking whethre javascript is functioning or not
console.log("Welcome to spotify");

//Initilizing the variable
let songIndex = 1;
let audioElement = new Audio('1.mp3');
let masterSongName = document.getElementById('masterSongName');
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let songItems = Array.from(document.getElementsByClassName('songItem'));
let songItemPlay = Array.from(document.getElementsByClassName('songItemPlay'));


//creating a class of song information
let songs = [
    {songName:"meethi meethi" , songPath: "1_meethi_meethi.mp3", coverPath:"cover1.jpg", duration:"3:17"},
    {songName:"Aao kabhi haveli pe" , songPath: "2.mp3", coverPath:"cover2.jpg", duration : "3:07"},
    {songName:"mehbooba kgf yash " , songPath: "3.mp3", coverPath:"cover3.jpg", duration :"4:07"},
    {songName:"Buzz ft Ashtha gill Badshah" , songPath: "4.mp3", coverPath:"cover4.jpg", duration: "3:00"},
    {songName:"Thumkeshwari - Bhediya " , songPath: "5.mp3", coverPath:"cover5.jpg", duration: "3:12"},

]

//Updating audio name in master play
masterSongName.innerHTML = "meethi meethi";


//Updating songName in list
songItems.forEach((element,i)=>{
    console.log(element,i);
    element.getElementsByTagName('img')[0].src = songs[i].coverPath;
    element.getElementsByClassName('songName')[0].innerHTML = songs[i].songName;
    element.getElementsByClassName('timeStamp')[0].innerHTML = songs[i].duration;
})

//Handle the pause/play click
masterPlay.addEventListener('click', ()=>{
    if(audioElement.paused || audioElement.currentTime <=0){
        audioElement.play();
        masterPlay.classList.remove('fa-play');
        masterPlay.classList.add('fa-pause');
        gif.style.opacity = 1;
        makeAllPlays();
        document.getElementById(`${songIndex}`).classList.remove('fa-play');
        document.getElementById(`${songIndex}`).classList.add('fa-pause');
    }
    else{
        audioElement.pause();
        masterPlay.classList.remove('fa-pause');
        masterPlay.classList.add('fa-play');
        gif.style.opacity = 0;
        makeAllPlays();
        document.getElementById(`${songIndex}`).classList.remove('fa-pause');
        document.getElementById(`${songIndex}`).classList.add('fa-play');
    }
    
})

//updating seekbar when song plays
audioElement.addEventListener('timeupdate',()=>{
    //updata seekbar
    progress = ((audioElement.currentTime/audioElement.duration)*100);
    myProgressBar.value = progress ;
})

//When we change seekbar then song will also change
myProgressBar.addEventListener('change',()=>{
    audioElement.currentTime = (myProgressBar.value*audioElement.duration)/100;
})


//Function for making all songs in play mode
const makeAllPlays = ()=>{
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
        element.classList.remove('fa-pause');
        element.classList.add('fa-play');
    })
}


//When anyone click on songlist displayed on display
songItemPlay.forEach((element)=>{
    element.addEventListener('click',(e)=>{
        console.log("audiio.paused",audioElement.paused)
        if(audioElement.paused || audioElement.currentTime ==0){
            makeAllPlays();
            e.target.classList.remove('fa-play');
            e.target.classList.add('fa-pause');
            songIndex = parseInt(e.target.id);
            // songIndex = 4;
            audioElement.src = `${songIndex}.mp3`;
            audioElement.currentTime = 0;
            audioElement.play();
            masterPlay.classList.remove('fa-play');
            masterPlay.classList.add('fa-pause');
            masterSongName.innerHTML = songs[songIndex-1].songName;
            gif.style.opacity = 1;

        }
        else{
            audioElement.pause();
            e.target.classList.remove('fa-pause');
            e.target.classList.add('fa-play');
            masterPlay.classList.remove('fa-pause');
            masterPlay.classList.add('fa-play');
            gif.style.opacity = 0;
        }
    })
})


//When anyone click on next button
document.getElementById('next').addEventListener('click',()=>{
    if(songIndex == 5){
        songIndex = 1;
    }
    else{
        songIndex+=1;
    }
    audioElement.src = `${songIndex}.mp3`;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play');
    masterPlay.classList.add('fa-pause');
    masterSongName.innerHTML = songs[songIndex-1].songName;
    gif.style.opacity = 1;
    makeAllPlays();
    document.getElementById(`${songIndex}`).classList.remove('fa-play');
    document.getElementById(`${songIndex}`).classList.add('fa-pause');
})


//When anyone click on previous button
document.getElementById('previous').addEventListener('click', ()=>{
    if(songIndex == 1){
        songIndex = 5;
    }
    else{
        songIndex-=1;
    }
    audioElement.src = `${songIndex}.mp3`;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play');
    masterPlay.classList.add('fa-pause');
    masterSongName.innerHTML = songs[songIndex-1].songName;
    gif.style.opacity = 1;
    makeAllPlays();
    document.getElementById(`${songIndex}`).classList.remove('fa-play');
    document.getElementById(`${songIndex}`).classList.add('fa-pause');
})