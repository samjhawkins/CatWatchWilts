import React, {createRef} from 'react';
import {withStyles} from '@material-ui/core/styles';

const styles = {
    canvas: {
        backgroundColor: "#6b92b9",
        display: "block",
        position: "fixed",
        width: "100vw",
        height: "50vh",
        top: 0,
        left: 0,
        zIndex: -1
    },
};

export class Background extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dimensions: [0,0],
            angle: 0,
            intervalId: 0,
            particles: []
        };
        this.canvasRef = createRef();
        this.draw = this.draw.bind(this);
    }

    componentDidMount() {
        let initParticles = [];
        const {maxParticles} = this.props;
        for (let i = 0; i < maxParticles; i++) {
            initParticles = [
                ...initParticles,
                {
                    x: Math.random() * window.innerWidth, //x-coordinate
                    y: Math.random() * window.innerHeight / 2, //y-coordinate
                    r: Math.random() * 0.1 + 1, //radius
                    d: Math.random() * maxParticles //density
                }
            ];
        }
        this.setState({
            particles: initParticles,
            intervalId: setInterval(this.draw, 30)
        });
    }

    componentWillUnmount() {
        clearInterval(this.state.intervalId);
    }

    draw() {
        const canvas = this.canvasRef.current;
        const ctx = canvas.getContext('2d');
        const particles = [...this.state.particles];
        let angle = this.state.angle;
        const W = canvas.width;
        const H = canvas.height;

        ctx.clearRect(0, 0, W, H);
        ctx.fillStyle = "rgba(255, 255, 255, 0.95)";
        ctx.beginPath();
        for (let i = 0; i < particles.length; i++) {
            let p = particles[i];
            ctx.moveTo(p.x, p.y);
            ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2, true);
        }
        ctx.fill();

        angle = angle + 0.001;
        for (let i = 0; i < particles.length; i++) {
            let p = particles[i];
            p.y += Math.cos(angle + p.d) + 1 + p.r / 2;
            p.x += Math.sin(angle) * 2;

            //Sending flakes back from the top when it exits
            //Lets make it a bit more organic and let flakes enter from the left and right also.
            if (p.x > W + 5 || p.x < -5 || p.y > H) {
                if (i % 3 > 0) {
                    particles[i] = {x: Math.random() * W, y: -10, r: p.r, d: p.d};
                } else {
                    //If the flake is exit1ng from the right
                    if (Math.sin(angle) > 0) {
                        //Enter from the left
                        particles[i] = {x: -5, y: Math.random() * H, r: p.r, d: p.d};
                    } else {
                        //Enter from the right
                        particles[i] = {
                            x: W + 5,
                            y: Math.random() * H,
                            r: p.r,
                            d: p.d
                        };
                    }
                }
            }

            if (particles.length) {
                this.setState({angle, particles});
            }
        }
    }

    render() {
        const {classes} = this.props;
        return (
            <React.Fragment>
                <canvas ref={this.canvasRef} id="background_canvas" className={classes.canvas}>
                </canvas>
            </React.Fragment>
        );
    }
}

Background.defaultProps = {
    maxParticles: 150
};

export default withStyles(styles)(Background);