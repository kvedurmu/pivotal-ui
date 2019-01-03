import '../spec_helper';
import {Dropdown} from '../../../src/react/dropdowns';
import ReactDOM from 'react-dom';
import React from 'react';

describe('Dropdown', () => {
  let subject;

  beforeEach(() => {
    const props = {
      className: 'test-class',
      id: 'test-id',
      style: {opacity: '0.5'},
      title: 'Dropping',
      buttonClassName: 'test-btn-class',
      buttonAriaLabel: 'Nessun Dorma'
    };

    subject = ReactDOM.render(<Dropdown {...props}>
      <a {...{href: 'test'}}>Item #1</a>
    </Dropdown>, root);
  });

  it('passes through className, style, and id to the dropdown', () => {
    expect('.dropdown').toHaveClass('test-class');
    expect('.dropdown').toHaveCss({opacity: '0.5'});
    expect('.dropdown').toHaveAttr('id', 'test-id');
  });

  it('correctly styles the dropdown-toggle, and adds a chevron icon', () => {
    expect('.dropdown button').toHaveText('Dropping');
    expect('.dropdown button').toHaveClass('test-btn-class');
    expect('.dropdown button').toHaveAttr('aria-haspopup', 'true');
    expect('.dropdown button').toHaveAttr('aria-label', 'Nessun Dorma');

    expect('.icon-chevron_down').toExist();
  });

  describe('split dropdown', () => {
    let onClickSpy;

    beforeEach(() => {
      onClickSpy = jasmine.createSpy('on click');
      setProps(subject, {split: true, onClick: onClickSpy, title: <div className="split-title"/>});
    });

    it('opens the dropdown when the dropdown button is clicked', () => {
      $('.dropdown-toggle').simulate('click');
      expect(onClickSpy.toHaveBeenCalled);
      expect(subject.state.open).toBeTruthy();
    });

    it('does not open the dropdown when the split text is clicked', () => {
      $('.split-title').simulate('click');
      expect(onClickSpy).not.toHaveBeenCalled();
      expect(subject.state.open).toBeFalsy();
    });
  });

  it('calls onClick when dropdown toggle is clicked', () => {
    const onClickSpy = jasmine.createSpy('onClick');
    setProps(subject, {onClick: onClickSpy});
    $('.dropdown-toggle').simulate('click');
    expect(onClickSpy).toHaveBeenCalled();
  });

  it('calls onEntered when opening', () => {
    const onEnteredSpy = jasmine.createSpy('onEntered');
    setProps(subject, {onEntered: onEnteredSpy});
    $('.dropdown-toggle').simulate('click');
    expect(onEnteredSpy).toHaveBeenCalled();
  });

  it('calls onExited when closing', () => {
    const onExitedSpy = jasmine.createSpy('onExited');
    setProps(subject, {onExited: onExitedSpy});

    $('.dropdown-toggle').simulate('click');
    expect(onExitedSpy).not.toHaveBeenCalled();

    $('.dropdown-toggle').simulate('click');
    expect(onExitedSpy).toHaveBeenCalled();
  });

  it('does not render a scrim when not open', () => {
    expect('.scrim').not.toExist();
  });

  describe('dropdown menu', () => {
    it('shows the children on click', () => {
      expect('.dropdown-open').not.toExist();
      $('.dropdown-toggle').simulate('click');

      expect('.dropdown').toHaveClass('dropdown-open');
      expect('.dropdown-menu').toExist();
    });

    it('has an aria-label on the underlying ul', () => {
      $('.dropdown-toggle').simulate('click');
      expect('.dropdown-menu ul').toHaveAttr('aria-label', 'submenu');
    });

    describe('when floatMenu is in the props', () => {
      it('renders a floating menu', () => {
        setProps(subject, {floatMenu: true});
        expect('.dropdown-menu').toHaveClass('dropdown-menu-float');
      });
    });

    describe('hiding children', () => {
      it('hides when the toggle is clicked', () => {
        $('.dropdown-toggle').simulate('click');
        $('.dropdown-toggle').simulate('click');
        expect('.dropdown-open').not.toExist();
      });

      it('hides when a menu item is selected', () => {
        $('.dropdown-toggle').simulate('click');
        $('.dropdown-menu li:eq(0)').simulate('click');
        expect('.dropdown-open').not.toExist();
      });

      describe('when blockingScrim is true and disableScrim is false', () => {
        beforeEach(() => {
          setProps(subject, {blockingScrim: true});
          $('.dropdown-toggle').simulate('click');
        });

        it('renders a blocking scrim', () => {
          expect('.scrim').toExist();
        });

        describe('when clicking outside of the dropdown', () => {
          beforeEach(() => {
            $('body').click();
          });

          it('hides the dropdown menu', () => {
            expect('.dropdown-open').not.toExist();
          });

          it('removes the scrim', () => {
            expect('.scrim').not.toExist();
          });
        });
      });

      describe('when blockingScrim is false and disableScrim is false', () => {
        beforeEach(() => {
          $('.dropdown-toggle').simulate('click');
        });

        it('does not render a blocking scrim', () => {
          expect('.scrim').not.toExist();
        });

        describe('when clicking outside of the dropdown', () => {
          beforeEach(() => {
            $('body').click();
          });

          it('hides the dropdown menu', () => {
            expect('.dropdown-open').not.toExist();
          });

          it('does not render a blocking scrim', () => {
            expect('.scrim').not.toExist();
          });
        });
      });

      describe('when blockingScrim is true and disableScrim is true', () => {
        beforeEach(() => {
          setProps(subject, {blockingScrim: true, disableScrim: true});
          $('.dropdown-toggle').simulate('click');
        });

        it('does not render a blocking scrim', () => {
          expect('.scrim').not.toExist();
        });

        describe('when clicking outside of the dropdown', () => {
          beforeEach(() => {
            $('body').click();
          });

          it('does not hide the dropdown menu', () => {
            expect('.dropdown-open').toExist();
          });

          it('does not render a blocking scrim', () => {
            expect('.scrim').not.toExist();
          });
        });
      });

      describe('when blockingScrim is false and disableScrim is true', () => {
        beforeEach(() => {
          setProps(subject, {disableScrim: true});
          $('.dropdown-toggle').simulate('click');
        });

        it('does not render a blocking scrim', () => {
          expect('.scrim').not.toExist();
        });

        describe('when clicking outside of the dropdown', () => {
          beforeEach(() => {
            $('body').click();
          });

          it('does not hide the dropdown menu', () => {
            expect('.dropdown-open').toExist();
          });

          it('does not render a blocking scrim', () => {
            expect('.scrim').not.toExist();
          });
        });
      });

      describe('when closeOnMenuClick is false', () => {
        it('does not close when the menu is clicked', () => {
          setProps(subject, {closeOnMenuClick: false});
          $('.dropdown-toggle').simulate('click');
          $('.dropdown-menu li:eq(0)').simulate('click');
          expect('.dropdown-open').toExist();
        });
      });

      describe('when scroll is true', () => {
        it('renders a scrollable menu', () => {
          setProps(subject, {scroll: true});
          $('.dropdown-toggle').simulate('click');
          expect('.dropdown-menu').toHaveClass('dropdown-menu-scroll');
        });
      });
    });

    describe('when border is provided', () => {
      it('has the border class', () => {
        setProps(subject, {border: true});
        $('.dropdown-toggle').simulate('click');
        expect('.dropdown-menu').toHaveClass('dropdown-border');
      });
    });

    describe('when menuAlign is provided', () => {
      it('can align right', () => {
        setProps(subject, {menuAlign: 'right'});
        $('.dropdown-toggle').simulate('click');
        expect('.dropdown-menu').toHaveClass('dropdown-menu-right');
      });

      it('can align left', () => {
        setProps(subject, {menuAlign: 'left'});
        $('.dropdown-toggle').simulate('click');
        expect('.dropdown-menu').toHaveClass('dropdown-menu-left');
      });

      it('can align none', () => {
        setProps(subject, {menuAlign: 'none'});
        $('.dropdown-toggle').simulate('click');
        expect('.dropdown-menu').not.toHaveClass('dropdown-menu-right');
        expect('.dropdown-menu').not.toHaveClass('dropdown-menu-left');
      });
    });
  });

  describe('when title is provided', () => {
    describe('when split is false', () => {
      it('puts the title in the dropdown toggle', () => {
        setProps(subject, {split: false, title: 'Dropping'});
        expect('.dropdown-label').not.toExist();
        expect('.dropdown-toggle').toHaveText('Dropping');
      });
    });

    describe('when split is true', () => {
      it('puts the title in a grid alongside the dropdown toggle', () => {
        setProps(subject, {split: true, title: 'Dropping'});
        expect('.dropdown .grid .col:eq(0)').toHaveText('Dropping');
        expect('.dropdown .grid .col:eq(1) .dropdown-toggle').toExist();
        expect('.dropdown .grid .col:eq(1) .dropdown-toggle').not.toHaveText('Dropping');
      });
    });
  });

  describe('when title is not provided and split is false', () => {
    it('renders an icon-only dropdown', () => {
      setProps(subject, {split: false, title: null});
      expect('.dropdown-icon-only').toExist();
      expect('.dropdown-menu').toHaveClass('dropdown-menu-float');
    });
  });

  describe('when flat is set in the props', () => {
    it('renders the flat styled dropdown', () => {
      setProps(subject, {flat: true});
      expect('.dropdown').toHaveClass('dropdown-flat');
    });
  });

  describe('when showIcon is false', () => {
    it('still renders an icon if there is not a title', () => {
      setProps(subject, {showIcon: false, title: null});
      expect('.icon-chevron_down').toExist();
    });

    it('still renders an icon if the dropdown is a split dropdown', () => {
      setProps(subject, {showIcon: false, split: true});

      expect('.icon-chevron_down').toExist();
    });

    it('does not render an icon otherwise', () => {
      setProps(subject, {showIcon: false, title: 'List of Things'});

      expect('.icon').not.toExist();
      expect('.icon-chevron_down').not.toExist();
    });
  });

  describe('when link prop is true', () => {
    it('adds the dropdown-link class to make everything link colors', () => {
      setProps(subject, {link: true});
      expect('.dropdown').toHaveClass('dropdown-link');
    });
  });

  describe('when size is provided', () => {
    it('can be large', () => {
      setProps(subject, {size: 'large'});
      $('.dropdown-toggle').simulate('click');
      expect('.dropdown-lg').toExist();
    });

    it('can be normal', () => {
      setProps(subject, {size: 'normal'});
      $('.dropdown-toggle').simulate('click');

      expect('.dropdown-sm').not.toExist();
      expect('.dropdown-lg').not.toExist();
    });

    it('can be small', () => {
      setProps(subject, {size: 'small'});
      $('.dropdown-toggle').simulate('click');

      expect('.dropdown-sm').toExist();
    });
  });

  describe('when icon is provided', () => {
    it('renders the associated svg', () => {
      setProps(subject, {icon: 'more_vert'});
      expect('.icon-more_vert').toExist();
    });
  });

  describe('when given children', () => {
    beforeEach(() => {
      setProps(subject, {
        children: [
          <a key="1" href="/link1">Link 1</a>,
          false,
          <a key="2" href="/link2">Link 2</a>
        ]
      });
    });

    it('wraps each child in an li tag', () => {
      expect('.dropdown li').toHaveLength(2);
      expect('.dropdown li:eq(0) a').toHaveAttr('href', '/link1');
      expect('.dropdown li:eq(1) a').toHaveAttr('href', '/link2');
    });
  });

  describe('when given an item class name', () => {
    beforeEach(() => {
      setProps(subject, {
        itemClassName: 'custom-li-class',
        children: [
          <a key="1" href="/link1">Link 1</a>,
          false,
          <a key="2" href="/link2">Link 2</a>
        ]
      });
    });

    it('applies the class name to each li', () => {
      expect('.dropdown li').toHaveLength(2);
      expect('.dropdown li:eq(0)').toHaveClass('custom-li-class');
      expect('.dropdown li:eq(1)').toHaveClass('custom-li-class');
    });
  });
});
