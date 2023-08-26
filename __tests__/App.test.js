import { render, waitFor, fireEvent } from '@testing-library/react-native';
import App from '../App';
import { act } from 'react-dom/test-utils';

// test if the app renders correctly without crashing
test('renders correctly', async () => {
  const { getByTestId } = render(<App />);

  await waitFor(
    () => {
      const searchBar = getByTestId('search-bar-1');
      expect(searchBar).not.toBeNull();
    },
    { timeout: 6000 }
  );
}, 10000);

// test default background color
test('test default background color', async() => {
  const { getByTestId } = render(<App />);
  await waitFor(()=> {
  const background = getByTestId('background-1'); 

  // if the style is an array, flatten it
  let styles = {};
  if (Array.isArray(background.props.style)) {
    styles = background.props.style.reduce((acc, cur) => {
      return { ...acc, ...cur };
    }, {});
  } else {
    styles = background.props.style;
  }

  // expect light background
  expect(styles.backgroundColor).toEqual('#fff');
  })
});

// test theme switch to dark mode
test('test background color switch', async() => {
  const { getByTestId } = render(<App />);
  await waitFor(()=>{
    // navigate to theme screen, switch to dark, navigate back to home screen
    const themePage = getByTestId('theme-select-nav');
    fireEvent.press(themePage);
    const themeButton = getByTestId('dark');
    fireEvent.press(themeButton);
    const homeButton = getByTestId('home-page-nav');
    fireEvent.press(homeButton);

    const background = getByTestId('background-1'); 

    // if the style is an array, flatten it
    let styles = {};
    if (Array.isArray(background.props.style)) {
      styles = background.props.style.reduce((acc, cur) => {
        return { ...acc, ...cur };
      }, {});
    } else {
      styles = background.props.style;
    }

    // expect dark background
    expect(styles.backgroundColor).toEqual('#050505');
  })
});

// test default font
test('test default font', async() => {
  const { getByTestId } = render(<App />);
  await waitFor(()=>{
    const searchBar = getByTestId('search-bar-1');

    let styles = {};
    if (Array.isArray(searchBar.props.style)) {
      styles = searchBar.props.style.reduce((acc, cur) => {
        return { ...acc, ...cur };
      }, {});
    } else {
      styles = searchBar.props.style;
    }
  
    // expect sans serif font
    expect(styles.fontFamily).toEqual('Sans_Serif-Bold');
  })
});

// test font switch
test('test font switch', async() => {
  const { getByTestId } = render(<App />);
  await waitFor(()=>{
    // navigate to font screen, switch to Mono, navigate back to home screen
    const fontPage = getByTestId('font-select-nav');
    fireEvent.press(fontPage);
    const monoButton = getByTestId('mono-button');
    fireEvent.press(monoButton);
    const homeButton = getByTestId('home-page-nav');
    fireEvent.press(homeButton);

    const searchBar = getByTestId('search-bar-1');

    let styles = {};
    if (Array.isArray(searchBar.props.style)) {
      styles = searchBar.props.style.reduce((acc, cur) => {
        return { ...acc, ...cur };
      }, {});
    } else {
      styles = searchBar.props.style;
    }

    // expect mono font
    expect(styles.fontFamily).toEqual('Mono-Bold');
  })
});

// test error on empty word
test('test empty word error', async () => {
  // hit search button without typing any word
  const { getByTestId, getByText } = render(<App />);
  await waitFor(() => {
    const searchButton = getByTestId('search-button');
    fireEvent.press(searchButton);

    const errorText = getByText('Whoops, can\'t be empty...');
    expect(errorText).not.toBeNull();
  },
  { timeout: 6000 });
});

// test error on non word
test('test non word error', async () => {
  // type nonsense string and hit search button
  const { getByTestId, getByText } = render(<App />);
  await waitFor(() => {
    const searchBar = getByTestId('search-bar-1');
    fireEvent.changeText(searchBar, 'asldfhph');
    const searchButton = getByTestId('search-button');
    fireEvent.press(searchButton);

    const errorText = getByText('No Defintions Found');
    expect(errorText).not.toBeNull();
  },
  { timeout: 6000 });
});

// test word getting correct definition
test('test word getting correct definition', async () => {
  // type a known word and hit search button
  const { getByTestId, getByText } = render(<App />);
  await waitFor(() => {
    const searchBar = getByTestId('search-bar-1');
    fireEvent.changeText(searchBar, 'Keyboard');
    const searchButton = getByTestId('search-button');
    fireEvent.press(searchButton);

    const definition = getByText('(etc.) A set of keys used to operate a typewriter, computer etc.');
    expect(definition).not.toBeNull();
  },
  { timeout: 10000 });
});