import './App.css';

function App() {
  return (
    <main>
      <header>
        <a href="#" className="logo">
          My Blog
        </a>
        <nav>
          <a href="">Login</a>
          <a href="">Register</a>
        </nav>
      </header>

      <div className="post">
        <div className="image">
          <img
            src="https://pbs.twimg.com/profile_images/1759330620160049152/2i_wkOoK_400x400.jpg"
            alt=""
          />
        </div>
        <div className="texts">
          <h2>theprimeagen is a good programmer</h2>
          <p>
            Theprimeagen is a programmer from the USA, he is about 37 years old
            and he has a good understanding of Neovim and plugins. He's also a
            fan of Rust and Lua languages
          </p>
        </div>
      </div>

      <div className="post">
        <div className="image">
          <img
            src="https://pbs.twimg.com/profile_images/1759330620160049152/2i_wkOoK_400x400.jpg"
            alt=""
          />
        </div>
        <div className="texts">
          <h2>theprimeagen is a good programmer</h2>
          <p>
            Theprimeagen is a programmer from the USA, he is about 37 years old
            and he has a good understanding of Neovim and plugins. He's also a
            fan of Rust and Lua languages
          </p>
        </div>
      </div>
    </main>
  );
}

export default App;
