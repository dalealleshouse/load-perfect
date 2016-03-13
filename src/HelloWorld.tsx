namespace app.componets {
    interface ICounter {
        counter: number;
    }

    interface IHelloMessageProperties {
        helloMessageClick: (inc: number) => void;
        incrementAmout: number;
    }

    class HelloMessage extends React.Component<IHelloMessageProperties, {}> {
        private increment = () => {
            this.props.helloMessageClick(this.props.incrementAmout);
        }

        render() {
            return (
                <div className="container">
                    <button onClick={ this.increment }>+{this.props.incrementAmout}</button>
                </div>
            );
        }
    }

    class Result extends React.Component<ICounter, {}> {
        render() {
            return (
                <div>{this.props.counter}</div>
            );
        }
    }

    class Main extends React.Component<{}, ICounter> {
        constructor(props: {}, context) {
            super(props, context);
            this.state = { counter: 0 };
        }

        render() {
            return (<div>
                <HelloMessage helloMessageClick={this.increment} incrementAmout={1} />
                <HelloMessage helloMessageClick={this.increment} incrementAmout={5} />
                <HelloMessage helloMessageClick={this.increment} incrementAmout={10} />
                <HelloMessage helloMessageClick={this.increment} incrementAmout={15} />
                <Result counter={this.state.counter} />
            </div>);
        };

        increment = (inc: number) => {
            this.setState({ counter: this.state.counter + inc });
        };
    }

    ReactDOM.render(<Main />, document.getElementById("mount"));
}