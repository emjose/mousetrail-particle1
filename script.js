// Canvas setup
const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
let particleArray = [];
const numberOfParticles = 200;

// Get Mouse Position
const mouse = {
	x: null,
	y: null,
};

window.addEventListener("mousemove", function (event) {
	mouse.x = event.x;
	mouse.y = event.y;
	// console.log(mouse.x, mouse.y);
});

setInterval(function () {
	mouse.x = undefined;
	mouse.y = undefined;
}, 200);

// Create Particles, constructor assigning values to attributes for new instance
class Particle {
	constructor(x, y, size, color, weight) {
		this.x = x;
		this.y = y;
		this.size = size;
		this.color = color;
		this.weight = weight;
	}
	draw() {
		ctx.beginPath();
		ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
		ctx.fillStyle = this.color;
		ctx.fill();
	}
	update() {
		this.size -= 0.05;
		if (this.size < 0) {
			this.x = mouse.x + (Math.random() * 20 - 10);
			this.y = mouse.y + (Math.random() * 20 - 10);
			// Change size from 2 to 12
			this.size = Math.random() * 10 + 12;
			this.weight = Math.random() * 2 - 0.5;
		}
		this.y += this.weight;
		this.weight += 0.2;

		if (this.y > canvas.height - this.size) {
			this.weight *= -1;
		}
	}
}

function init() {
	particleArray = [];
	for (let i = 0; i < numberOfParticles; i++) {
		let x = Math.random() * canvas.width;
		let y = Math.random() * canvas.height;
		let size = Math.random() * 5 + 2;
		let color = "pink";
		let weight = 1;
		particleArray.push(new Particle(x, y, size, color, weight));
	}
}

function animate() {
	// ctx.clearRect(0, 0, canvas.width, canvas.height);
	ctx.fillStyle = "rgba(0,0,0,0.01)";
	ctx.fillRect(0, 0, canvas.width, canvas.height);
	for (let i = 0; i < particleArray.length; i++) {
		particleArray[i].update();
		particleArray[i].draw();
	}
	requestAnimationFrame(animate);
}

init();
animate();

function swRegistration() {
	const heart = ["font-size: 20px", "padding: 12px", "margin: 4px 0 4px 4px", "color: rgba(238,58,136,1)"].join(";");
	if ("serviceWorker" in navigator) {
		navigator.serviceWorker
			.register("/mousetrail-particle1/sw.js", {
				scope: "/mousetrail-particle1/",
			})
			.then(function (registration) {
				console.log("%c❤️", heart);
			})
			.catch(function (err) {
				console.log(err);
			});
	}
}

function consoleText() {
	console.clear();
	const styles = [
		"color: white",
		"background: rgba(238,58,136,1)",
		"font-size: 18px",
		"padding: 12px",
		"margin: 6px 0 6px 14px",
	].join(";");
	const styles2 = ["font-size: 14px", "padding: 16px", "margin: 6px 0 6px 0", "color: rgba(238,58,136,1)"].join(";");
	console.log("%cHello World! I'm Emmanuel.", styles);
	console.log("%cThank you for checking out my work!", styles2);
	const gradient = [
		"font-size: 14px",
		"color: #fff",
		"width: 200px",
		"padding: 8px",
		"margin: 6px 0 6px 14px",
		"border-radius: 4px",
		"background: rgba(238,58,136,1)",
		"background: linear-gradient( 109.6deg, rgba(238,58,136,1) 11.2%, rgba(128,162,245,1) 91.1% )",
	].join(";");
	console.log("%cPortfolio%chttps://bit.ly/3QQr1Ux", gradient, styles2);
	console.log("%cLinkedin %chttps://bit.ly/3cygAD4", gradient, styles2);
	console.log("%cGithub   %chttps://bit.ly/3iwQC6U", gradient, styles2);
	console.log("%cThe README   %chttps://bit.ly/3ScTpkh", gradient, styles2);
	console.log("%cHave a wonderful day!", styles2);
}

swRegistration();
consoleText();
