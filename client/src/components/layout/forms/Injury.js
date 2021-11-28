const Injury = ({ injury, deleteInjury, idx }) => {
  return (
    <tr>
      <td>{injury.type}</td>
      <td>{injury.size}</td>
      <td>{injury.location}</td>
      <td>{injury.object}</td>
      <td>{injury.nature}</td>
      <td>{injury.duration}</td>
      <td>
        <button type='button' onClick={() => deleteInjury(idx)}>
          Delete
        </button>
      </td>
    </tr>
  );
};

export default Injury;
