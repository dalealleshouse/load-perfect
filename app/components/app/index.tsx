import * as React from "react";

import { BarLoader } from "../bar-loader/bar-loader";
import { CalculatorInputs, ICalculatorInput } from "../calculator-inputs/calculator-inputs";
import { calculatorAction, IAction } from "../../actions/plate-calculator-actions";
import { IApplicationState } from "../../reducers/root-reducer";
import { connect } from "react-redux";

interface IAppContext {
    store: Redux.Store;
}

const mapStateToProps = (state: IApplicationState) => {
    return {
        units: state.plateCalculator.units,
        requestedWeight: state.plateCalculator.requestedWeight,
        barWeight: state.plateCalculator.barWeight
    };
};

const mapDispatchToProps = (dispatch: (action: IAction) => void) => {
    return {
        onChanged: (change: ICalculatorInput) => {
            const action = calculatorAction(change);
            dispatch(action);
        }
    };
};

let ConnectCalculatorInputs = connect(mapStateToProps, mapDispatchToProps)(CalculatorInputs as any);

const mapBarLoaderStateToProps = (state: IApplicationState) => { return { plateCalculation: state.plateCalculator.plateCalculation }; };
let ConnectBarLoader = connect(mapBarLoaderStateToProps)(BarLoader as any);

export class App extends React.Component<React.Props<App>, {}> {
    private unsubscribe: Function;
    context: IAppContext;

    static contextTypes = {
        store: React.PropTypes.object
    };

    componentDidMount() {
        this.unsubscribe = this.context.store.subscribe(() => this.forceUpdate());
    }

    componentWillUnmount() {
        this.unsubscribe();
    }

    render() {
        return (<div className="container">
            <div className="row">
                <div className="col-md-3">
                    <ConnectCalculatorInputs />
                </div>
                <div className="col-md-9">
                    <ConnectBarLoader />
                </div>
            </div>
        </div>);
    }
};

