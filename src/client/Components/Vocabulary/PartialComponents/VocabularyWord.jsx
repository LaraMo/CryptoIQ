import React, {PureComponent} from 'react';
import _ from 'lodash';

export default class VocabularyWord extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      index: this.props.index,
      wordsEntered: '',
      defintionsEntered: '',
      pageNumberEntered: '',
    };
  }

  componentDidMount() {
    if (this.props.savedDefinition) {
      const {
        wordsEntered,
        defintionsEntered,
        pageNumberEntered,
        index,
      } = this.props.savedDefinition;
      this.setState({
        wordsEntered,
        defintionsEntered,
        pageNumberEntereda,
      });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      this.props.savedDefinition &&
      !prevState.wordsEntered &&
      !prevState.defintionsEntered &&
      !prevState.pageNumberEntered
    ) {
      const {
        wordsEntered,
        defintionsEntered,
        pageNumberEntered,
      } = this.props.savedDefinition;
      this.setState({
        wordsEntered,
        defintionsEntered,
        pageNumberEntered,
      });
    }
  }

  render() {
    //Form
    const word = 'Word';
    const defintion = 'Defintion';
    const pageNumber = 'Page';
    const {
      wordsEntered,
      defintionsEntered,
      pageNumberEntered,
      index,
    } = this.state;

    let pageNumberInput = null;
    if (this.props.acceptPageNumber) {
      pageNumberInput = (
        <div className="home-form-field-word">
          <p>{pageNumber}</p>
          <input
            id="pageNumber"
            value={pageNumberEntered}
            onChange={e => {
              this.props.onChange(e, this.props.index);
              this.setState(
                {
                  pageNumberEntered: e.target.value,
                },
                () => this.props.onChange(this.props.index, this.state),
              );
            }}
          ></input>
        </div>
      );
    }
    return (
      <div className="home-form-field">
        <div className="home-form-field-word">
          <p>{word}</p>
          <input
            value={wordsEntered}
            onChange={e => {
              this.setState(
                {
                  wordsEntered: e.target.value,
                },
                () => this.props.onChange(this.props.index, this.state),
              );
            }}
          />
        </div>

        <div className="home-form-field-definition">
          <p>{defintion}</p>
          <input
            id="defintion"
            value={defintionsEntered}
            onChange={e => {
              this.props.onChange(e, this.props.index);
              this.setState(
                {
                  defintionsEntered: e.target.value,
                },
                () => this.props.onChange(this.props.index, this.state),
              );
            }}
          ></input>
        </div>
        {pageNumberInput}
      </div>
    );
  }
}
