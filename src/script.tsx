namespace app.componets {
    interface ICardProperties {
        login: string;
    }

    interface ICardState {
        name: string;
        avatar_url: string;
    }

    class Card extends React.Component<ICardProperties, ICardState> {
        constructor(props: ICardProperties) {
            super(props);
            this.state = { name: "", avatar_url: "" };
        }

        componentDidMount() {
            $.get(`https://api.github.com/users/${this.props.login}`, data => this.setState(data));
        }

        render() {
            return (
                <div>
                    <image src={this.state.avatar_url} width="100px" />
                    <h3>{this.state.name}</h3>
                    <hr />
                </div>
            );
        }
    }

    interface IFormProperties {
        onSubmit: (login: string) => void;
    }

    class Form extends React.Component<IFormProperties, {}> {
        stopSubmit(e: React.FormEvent) {
            e.preventDefault();
            let loginInput = ReactDOM.findDOMNode<HTMLInputElement>(this.refs["login"]);

            if (this.props.onSubmit) {
                this.props.onSubmit(loginInput.value);
            }

            loginInput.value = "";
        }

        render() {
            return (
                <form onSubmit={ e => this.stopSubmit(e) }>
                    <input placeholder="github login" ref="login" />
                    <button>Add</button>
                </form>
            );
        }
    }

    interface IMainState {
        logins: string[];
    }

    class Main extends React.Component<{}, IMainState> {
        constructor(props: {}) {
            super(props);
            this.state = { logins: [] };
        }

        render() {
            let cards = this.state.logins.map(l => (<Card key={l} login={l} />));

            return (
                <div>
                    <Form onSubmit={this.addCard} />
                    {cards}
                </div>
            );
        };

        addCard = (login: string) => {
            this.setState({ logins: this.state.logins.concat(login) });
        };
    }
}