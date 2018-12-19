var prevSong = "";
var lyricsDiv;

window.addEventListener("load", function () {
	var div = document.createElement("div");
	div.className = "el-lyrics";
	document.querySelector("#main").insertAdjacentElement("afterend", div);
	lyricsDiv = div;
	setTimeout (checkSong, 5000)	
})

function getSong () {
	var artist = document.querySelector(".track-info__artists a").innerText;
	var title = document.querySelector(".track-info__name a").innerText;
	return artist + " " + title;
}

function checkSong () {
	var newSong = getSong();
	if (newSong !== prevSong) {
		console.log(newSong);
		prevSong = newSong;

		getLyrics(newSong);
		scrollToTop();
	}
	setTimeout(checkSong, 2000);

}

function getLyrics(newSong){
	newSong = encodeURIComponent(newSong);
	const Http = new XMLHttpRequest();
	let url='https://api.genius.com/search?access_token=5H8kqV-kALD0uxVuXZ3cDvsED7FHZ8AlECXXxT_GTlMZs3yZnwmgkYrcz5sc88bG&q=' + newSong;
	Http.open("GET", url);
	Http.send();
	Http.onreadystatechange=function(){
		if (this.readyState==4 && this.status==200) {
		var address = JSON.parse(Http.responseText).response.hits[0].result.url;
		downloadGenius(address);
		}
	}
}

function downloadGenius(url) {
	const Http = new XMLHttpRequest();
	Http.open("GET", url);
	Http.send();
	Http.onreadystatechange=function(){
		if (this.readyState==4 && this.status==200) {
			const div = document.createElement('div');
      		div.innerHTML = this.responseText;
      		const lyrics = div.querySelector('.lyrics');
			lyricsDiv.innerHTML = lyrics.innerHTML;
		}
	}
}

function scrollToTop() {
	lyricsDiv.scrollTop = 0;
}