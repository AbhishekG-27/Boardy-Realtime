interface GenerateIdProps {
  cliendId: string;
}

const GenerateId = ({ cliendId }: GenerateIdProps) => {
  return (
    <div>
      {cliendId ? (
        <div className="text-white">Id : {cliendId}</div>
      ) : (
        <div className="text-white">
          Generating Id...
        </div>
      )}
    </div>
  );
};

export default GenerateId;
