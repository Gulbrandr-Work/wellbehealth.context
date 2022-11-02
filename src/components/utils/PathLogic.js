import Btns from "../shared/Buttons";

const PathLogic = (pData) => {
  const paths = pData.map((pItem, index) => {
    let btnSetup = pItem.buttons.map((btn, index) => {
      return (
        <Btns
          label={btn.label}
          pathID={btn.pathID}
          cName={btn.cName}
          key={index}
        />
      );
    });

    return (
      <div className="p-4 w-full md:w-1/2 bg-white" key={index}>
        <div className="h-full p-6 rounded-lg border-2 border-gray-300 flex flex-col relative overflow-hidden">
          <h1 className="text-3xl text-gray-900 pb-4 mb-4 border-b border-gray-200 leading-none">
            {pItem.name}
          </h1>
          <p>{pItem.copy}</p>
          <div className="btn-wrap  flex mt-3">{btnSetup}</div>
        </div>
      </div>
    );
  });

  return <div className="flex flex-wrap my-4 w-full">{paths}</div>;
};

export default PathLogic;
