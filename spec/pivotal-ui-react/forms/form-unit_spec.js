import '../spec_helper';
import {FormUnit} from '../../../src/react/forms';
import {TooltipTrigger} from '../../../src/react/tooltip';

describe('FormUnit', () => {
  let subject;

  beforeEach(() => {
    spyOnRender(TooltipTrigger).and.callThrough();
    subject = ReactDOM.render(<FormUnit {...{
      className: 'my-class',
      children: (<div><span>hello</span></div>)
    }}/>, root);
  });

  it('does not render a label row when no label is provided', () => {
    expect('.form-unit .label-row').not.toExist();
  });

  describe('when no children are provided', () => {
    beforeEach(() => {
      subject = ReactDOM.render(<FormUnit {...{
        className: 'my-class',
        label: 'some label'
      }}/>, root);
    });

    it('does not render a field row', () => {
      expect('.form-unit .field-row').not.toExist();
    });
  });


  describe('inline', () => {
    beforeEach(() => {
      setProps(subject, {inline: true, label: 'Instance Name', help: 'my-help-text'});
    });

    it('renders the field and label on a grid next to each other', () => {
      expect('.form-unit .grid:eq(0) > .col:eq(0)').toHaveText('Instance Name');
      expect('.form-unit .grid:eq(0) > .col:eq(1)').toHaveText('hello');
    });

    it('applies the "inline-form-unit" class to the form unit', () => {
      expect('.form-unit').toHaveClass('inline-form-unit');
    });

    it('renders the help row in a grid', () => {
      expect('.form-unit .grid:eq(1) > .col:eq(0).help-row').toHaveText('my-help-text');
    });
  });

  describe('hideHelpRow', () => {
    beforeEach(() => {
      setProps(subject, {hideHelpRow: true});
    });

    it('does not render the help row', () => {
      expect('.form-unit .help-row').not.toExist();
    });
  });

  describe('inline and hideHelpRow', () => {
    beforeEach(() => {
      setProps(subject, {inline: true, hideHelpRow: true});
    });

    it('does not render the help row', () => {
      expect('.form-unit .help-row').not.toExist();
    });
  });

  describe('label', () => {
    beforeEach(() => {
      setProps(subject, {
        label: 'Instance Name'
      });
    });

    it('shows a label', () => {
      expect('.form-unit .label-row').toContainText('Instance Name');
    });

    it('shows the label before the field', () => {
      expect('.form-unit').toHaveText('Instance Namehello');
    });
  });

  describe('retainLabelHeight', () => {
    beforeEach(() => {
      setProps(subject, {
        retainLabelHeight: true
      });
    });

    it('renders an empty label row', () => {
      expect('.form-unit .label-row').toHaveText('');
    });
  });

  describe('labelClassName', () => {
    beforeEach(() => {
      setProps(subject, {
        label: 'Some label',
        labelClassName: 'h4'
      });
    });

    it('puts the classname on the label', () => {
      expect('.form-unit .label-row label').toHaveClass('h4');
    });
  });

  describe('labelFor', () => {
    beforeEach(() => {
      setProps(subject, {
        label: 'some-label',
        labelFor: 'instance-name'
      });
    });

    it('sets the "for" on the label', () => {
      expect('.form-unit .label-row label').toHaveAttr('for', 'instance-name');
    });
  });

  describe('labelPosition', () => {
    beforeEach(() => {
      setProps(subject, {
        label: 'Instance Name',
        labelPosition: 'after'
      });
    });

    it('shows the label on the right side', () => {
      expect('.form-unit').toHaveText('helloInstance Name');
    });
  });

  describe('postLabel', () => {
    beforeEach(() => {
      setProps(subject, {
        postLabel: <span className="more-stuff">another label</span>
      });
    });

    it('renders the postLabel', () => {
      expect('.form-unit .label-row .post-label .more-stuff').toHaveText('another label');
      expect('.form-unit .label-row .post-label').toHaveClass('col-fixed');
      expect('.form-unit .label-row .post-label').toHaveClass('col-middle');
    });

    describe('when inline', () => {
      beforeEach(() => {
        setProps(subject, {inline: true});
      });

      it('does not render the postLabel', () => {
        expect('.form-unit .label-row .post-label').not.toExist();
      });
    });

    describe('when the postLabel is a function', () => {
      let postLabel, state, setValues;

      beforeEach(() => {
        postLabel = jasmine.createSpy('postLabel').and.returnValue(<span className="returned">returned</span>);
        setValues = jasmine.createSpy('setValues');
        state = {key: 'value'};

        setProps(subject, {postLabel, state, setValues});
      });

      it('calls the postLabel function', () => {
        expect(postLabel).toHaveBeenCalledWith({state, setValues});
      });

      it('renders the returned node', () => {
        expect('.form-unit .label-row .post-label .returned').toHaveText('returned');
      });
    });
  });

  describe('tooltip', () => {
    beforeEach(() => {
      setProps(subject, {
        label: 'Some label',
        tooltip: <span>This is a tooltip.</span>
      });
    });

    it('shows a tooltip', () => {
      expect('.form-unit .label-row .tooltip .icon').toExist();
      expect('.form-unit .label-row .tooltip .tooltip-content').toHaveText('This is a tooltip.');
    });

    it('renders tooltip with default placement and default size', () => {
      expect(TooltipTrigger).toHaveBeenRenderedWithProps(jasmine.objectContaining({
        placement: 'top',
        size: 'lg'
      }));
    });
  });

  describe('tooltipPlacement', () => {
    beforeEach(() => {
      setProps(subject, {
        label: 'Some label',
        tooltip: <span>This is a tooltip.</span>,
        tooltipPlacement: 'right'
      });
    });

    it('renders tooltip with the given placement', () => {
      expect(TooltipTrigger).toHaveBeenRenderedWithProps(jasmine.objectContaining({
        placement: 'right'
      }));
    });
  });

  describe('tooltipSize', () => {
    beforeEach(() => {
      setProps(subject, {
        label: 'Some label',
        tooltip: <span>This is a tooltip.</span>,
        tooltipSize: 'sm'
      });
    });

    it('renders tooltip with the given size', () => {
      expect(TooltipTrigger).toHaveBeenRenderedWithProps(jasmine.objectContaining({
        size: 'sm'
      }));
    });
  });

  describe('optional', () => {
    beforeEach(() => {
      setProps(subject, {label: 'Some label', optional: true});
    });

    it('renders the optional text', () => {
      expect('.form-unit .label-row .optional-text').toContainText('(Optional)');
    });
  });

  describe('optionalText', () => {
    beforeEach(() => {
      setProps(subject, {label: 'Some label', optional: true, optionalText: '(Optional - custom text)'});
    });

    it('renders the custom optional text when provided', () => {
      expect('.form-unit .label-row .optional-text').toHaveText('(Optional - custom text)');
    });
  });

  describe('optionalText empty string', () => {
    beforeEach(() => {
      setProps(subject, {label: 'Some label', optional: true, optionalText: ''});
    });

    it('renders the custom optional text when provided', () => {
      expect('.form-unit .label-row .optional-text').toHaveText('');
    });
  });

  it('renders the field', () => {
    expect('.form-unit .field-row div span').toContainText('hello');
  });

  describe('help', () => {
    beforeEach(() => {
      setProps(subject, {
        help: (<div>
          <pre>help</pre>
        </div>)
      });
    });

    it('renders the help block', () => {
      expect('.form-unit .help-row div pre').toContainText('help');
      expect('.form-unit .help-row').toHaveClass('type-dark-5');
    });
  });

  describe('fieldRowClassName', () => {
    beforeEach(() => {
      setProps(subject, {fieldRowClassName: 'some-field-row'});
    });

    describe('not inline', () => {
      it('gives the class name to the field row', () => {
        expect('.form-unit .field-row').toHaveClass('some-field-row');
      });
    });

    describe('inline', () => {
      beforeEach(() => {
        setProps(subject, {inline: true});
      });

      it('gives the class name to the field row', () => {
        expect('.form-unit .field-row').toHaveClass('some-field-row');
      });
    });
  });

  describe('labelRowClassName', () => {
    beforeEach(() => {
      setProps(subject, {labelRowClassName: 'some-label-row', label: 'some label'});
    });

    describe('not inline', () => {
      it('gives the class name to the label row', () => {
        expect('.form-unit .label-row').toHaveClass('some-label-row');
      });
    });

    describe('inline', () => {
      beforeEach(() => {
        setProps(subject, {inline: true});
      });

      it('gives the class name to the label row', () => {
        expect('.form-unit .label-row').toHaveClass('some-label-row');
      });
    });
  });

  it('does not has the has-error class', () => {
    expect('.form-unit').not.toHaveClass('has-error');
  });

  it('renders the given class name', () => {
    expect('.form-unit').toHaveClass('my-class');
  });

  describe('when there is no tooltip', () => {
    beforeEach(() => {
      setProps(subject, {
        label: 'Some label',
        tooltip: null
      });
    });

    it('does not render a tooltip', () => {
      expect('.form-unit .label-row').toContainText('Some label');
      expect('.form-unit .label-row .tooltip').not.toExist();
    });
  });

  describe('when there is no help block', () => {
    beforeEach(() => {
      setProps(subject, {help: null});
    });

    it('renders an empty div', () => {
      expect('.form-unit div.help-row').toHaveText('');
    });
  });

  describe('when hasError is true', () => {
    beforeEach(() => {
      setProps(subject, {hasError: true});
    });

    it('applies the has-error class', () => {
      expect('.form-unit').toHaveClass('has-error');
    });

    it('removes the type-dark-5 class from the help block', () => {
      expect('.form-unit .help-row').not.toHaveClass('type-dark-5');
    });
  });

  describe('when there is no label, children, or help block', () => {
    beforeEach(() => {
      setProps(subject, {label: null, children: null, help: null});
    });

    it('renders nothing', () => {
      expect('.form-unit').not.toExist();
    });
  });
});