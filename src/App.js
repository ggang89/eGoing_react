import { useState } from "react";

function Header(props) {
  return (
    <header>
      <h1>
        <a
          href="/"
          onClick={(event) => {
            //event 객체를 첫번째 파라미터로 호출해준다
            event.preventDefault();
            props.onChangeMode();
          }}
        >
          {props.title}
        </a>
      </h1>
    </header>
  );
}
function Nav(props) {
  const lis = []
  for (let i = 0; i < props.topics.length; i++) {
    let t = props.topics[i];
    lis.push(
      <li key={t.id}>
        <a
          id={t.id}
          href={"/read/" + t.id}
          onClick={(event) => {
            // 파라미터가 1개일때는 괄호 생략가능
            // id={t.id}가 onChangeMode가 필요한 id를 넣어주는 것
            event.preventDefault();
            props.onChangeMode(Number(event.target.id));//여기서 id값은 문자열이라서 숫자로 바꿔줘야함
            //event.target =>event를 유발시킨 것(여기서는 a태그)
            //e target에서 id를 받음=>숫자로 받았지만 태그의 속성으로 넘기면 id값이 문자가 된다
          }}
        >
          {t.title}
        </a>
      </li>
    );
    //a태그도 동적으로 바껴야 하기때문에 {중괄호} 사용
  }

  return (
    <nav>
      <ol>
        {lis}
      </ol>
    </nav>
  );
}

function Article(props) {
  return (
    <article>
      <h2>{props.title}</h2>
      {props.body}
    </article>
  );
}

function Create(props) {
  return (
    <article>
      <h2>Create</h2>
      <form onSubmit={event => {
        event.preventDefault();
        const title = event.target.title.value;
        const body = event.target.body.value;
        props.onCreate(title, body);
      }}>
        <p>
          <input type="text" name="title" placeholder="title" />
        </p>
        <p>
          <textarea name="body" placeholder="body"></textarea>
        </p>
        {/* p태그로 감싸주면 가로정렬이 세로정렬로 변경됨 */}
        <p><input type="submit" value="Create"></input></p>
      </form>
    </article>
  );
}

function App() {
  const [mode, setMode] = useState("WELCOME");
  const [id, setId] = useState(null);
  const [nextId, setNextId] = useState(4);
  const [topics, setTopics] = useState([
    { id: 1, title: "html", body: "html is..." },
    { id: 2, title: "css", body: "css is..." },
    { id: 3, title: "javascript", body: "javascript is..." },
  ]);
  let content = null;
  if (mode === "WELCOME") {
    content = <Article title="Welcome" body="Hello,web"></Article>;
  } else if (mode === "READ") {
    let title, body = null;
    for (let i = 0; i < topics.length; i++){
      if (topics[i].id === id) {
        title = topics[i].title;
        body = topics[i].body;
      }
    }
    content = <Article title={title} body={body}></Article>;
  } else if (mode === 'CREATE') {
    content = <Create onCreate={(_title,_body) => {
      const newTopic = { id: nextId, title: _title, body: _body }
      const newTopics = [...topics]
      newTopics.push(newTopic);
      setTopics(newTopics);
      setMode('READ');
      setId(nextId);
      setNextId(nextId + 1);
    }}></Create>
  }
  return (
    <div>
      <Header
        title="WEB"
        onChangeMode={() => {
          //onChangeMode라는 props을 갖는다
          setMode("WELCOME");
        }}
      ></Header>
      <Nav
        topics={topics}
        onChangeMode={(_id) => {
          //여기서 받아오는 id값은 마음대로 정해도 되는가???
          setMode("READ");
          setId(_id);
        }}
      ></Nav>
      {/* "문자열 그대로 전달" {변수 전달} */}
      {content}
      <a
        href="/create"
        onClick={(event) => {
          event.preventDefault();
          setMode("CREATE");
        }}
      >
        Create
      </a>
    </div>
  );
}

export default App;
