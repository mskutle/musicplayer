export function Player() {
  return (
    <div className="flex shrink-0 bg-black h-24">
      <div className="w-fit shrink-0 grow-0 bg-blue-800 p-2 flex items-center">
        Current song
      </div>
      <div className="grow bg-green-800 flex items-center justify-center p-2">
        Controls
      </div>
      <div className="w-fit bg-purple-700 flex items-center justify-end p-2">
        Volume & stuff
      </div>
    </div>
  );
}
