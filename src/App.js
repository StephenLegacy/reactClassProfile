import React, { Component } from 'react';
import './App.css'; // Optional for your own custom styles

// Main class-based component
class App extends Component {
  constructor(props) {
    super(props);

    // Initializing component state
    this.state = {
      persons: [
        {
          fullName: 'Arya Stark',
          bio: 'A brave young warrior from Winterfell. Expert in sword fighting and disguise.',
          imgSrc: 'https://upload.wikimedia.org/wikipedia/en/3/39/Arya_Stark-Maisie_Williams.jpg',
          profession: 'Assassin',
        },
        {
          fullName: 'Stephen Oloo',
          bio: 'A passionate cloud practitioner, web designer, and cybersecurity enthusiast.',
          imgSrc: process.env.PUBLIC_URL + '/stephen.jpeg',
          profession: 'Cloud & Security Engineer',
        },
      ],
      currentIndex: 0,
      show: false,
      timeSinceMount: 0,
      darkMode: false, // New: To toggle between light and dark mode
    };

    this.timer = null; // Interval for tracking component lifetime
    this.profileSwitcher = null; // Interval for auto-switching profiles
  }

  // Lifecycle method: Called once component is mounted
  componentDidMount() {
    // Increment timeSinceMount every second
    this.timer = setInterval(() => {
      this.setState((prev) => ({
        timeSinceMount: prev.timeSinceMount + 1,
      }));
    }, 1000);

    // Auto switch profiles every 10 seconds
    this.profileSwitcher = setInterval(() => {
      this.setState((prev) => ({
        currentIndex: (prev.currentIndex + 1) % this.state.persons.length,
      }));
    }, 10000);
  }

  // Cleanup intervals when component is unmounted
  componentWillUnmount() {
    clearInterval(this.timer);
    clearInterval(this.profileSwitcher);
  }

  // Toggle profile visibility
  toggleShow = () => {
    this.setState((prevState) => ({
      show: !prevState.show,
    }));
  };

  // Manually switch between profiles
  switchProfile = () => {
    this.setState((prevState) => ({
      currentIndex: (prevState.currentIndex + 1) % this.state.persons.length,
    }));
  };

  // Toggle between light and dark mode
  toggleTheme = () => {
    this.setState((prevState) => ({
      darkMode: !prevState.darkMode,
    }));
  };

  render() {
    const { persons, currentIndex, show, timeSinceMount, darkMode } = this.state;
    const person = persons[currentIndex];

    // Dynamic theme styles based on darkMode boolean
    const themeStyles = {
      backgroundColor: darkMode ? '#121212' : '#f4f4f4',
      color: darkMode ? '#ffffff' : '#333333',
      minHeight: '100vh',
      padding: '2rem',
      transition: 'all 0.4s ease-in-out',
      textAlign: 'center',
    };

    const buttonStyle = {
      padding: '10px 20px',
      margin: '0.5rem',
      border: 'none',
      borderRadius: '8px',
      backgroundColor: darkMode ? '#333' : '#007bff',
      color: '#fff',
      cursor: 'pointer',
      transition: 'background-color 0.3s ease',
    };

    const profileCardStyle = {
      border: '2px solid #ccc',
      borderRadius: '15px',
      width: '300px',
      margin: '1rem auto',
      padding: '1rem',
      boxShadow: darkMode
        ? '0 0 20px rgba(255,255,255,0.1)'
        : '0 0 15px rgba(0,0,0,0.2)',
      animation: 'fadeIn 0.6s ease',
    };

    return (
      <div className="App" style={themeStyles}>
        <h1>React Class Component Checkpoint</h1>

        {/* Buttons: Show/Hide, Switch Profile, Toggle Theme */}
        <div style={{ marginBottom: '1rem' }}>
          <button onClick={this.toggleShow} style={buttonStyle}>
            {show ? 'Hide Profile' : 'Show Profile'}
          </button>

          <button onClick={this.switchProfile} style={buttonStyle}>
            Switch Profile
          </button>

          <button onClick={this.toggleTheme} style={buttonStyle}>
            Toggle {darkMode ? 'Light' : 'Dark'} Mode
          </button>
        </div>

        {/* Profile Section (conditionally rendered) */}
        {show && (
          <div style={profileCardStyle}>
            <img
              src={person.imgSrc}
              alt="Profile"
              style={{ width: '100%', borderRadius: '10px' }}
            />
            <h2>{person.fullName}</h2>
            <p><strong>Bio:</strong> {person.bio}</p>
            <p><strong>Profession:</strong> {person.profession}</p>
          </div>
        )}

        {/* Time since the component was mounted */}
        <p style={{ marginTop: '2rem', fontStyle: 'italic', color: darkMode ? '#ccc' : '#666' }}>
          ⏱ Time since mount: {timeSinceMount} seconds
        </p>
      </div>
    );
  }
}

export default App;
