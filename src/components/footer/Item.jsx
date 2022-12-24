// Ethan Cullen

function Item({ Links, title }) {
  return (
    <ul>
      <h4 className="mb-1 font-semibold">{title}</h4>
      {Links.map((link) => (
        <li key={link.name}>
          <a
            className="text-sm leading-6 text-gray-400 duration-300 cursor-pointer hover:text-teal-400"
            href={link.link}>
            {link.name}
          </a>
        </li>
      ))}
    </ul>
  );
}

export { Item };
