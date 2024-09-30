import { InputField } from "@/components/InputFields";
import useInputValidator from "@/hooks/useInputValidator";
import { Toilet } from "@/types";
import { useState } from "react";
import Loading from "@/components/Loading";
import { closeModal } from "@/helper/helperFunctions";
import { useMap } from "@/contexts/MapContext";
import Map from "@/components/Map";
import TextEditor from "../TextEditor";

interface ToiletModalProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  toilet?: Toilet;
}

const INITIAL_COORDINATES = { lng: 153.01301, lat: -27.49748, zoom: 16 };
const TOILET_NAME_REGEX = /^[A-Za-z0-9\s,.'-]{1,50}$/;
const BUILDING_REGEX = /^[A-Za-z0-9\s.,()'-]{1,50}$/;
const FLOOR_REGEX = /^[0-9a-zA-Z]{1,2}$/;

const ToiletModal = ({ open, setOpen, toilet }: ToiletModalProps) => {
  const { moveTo, lat, lng } = useMap();
  const toiletValidator = (name: string) => TOILET_NAME_REGEX.test(name);
  const [toiletName, setToiletName, validToiletName] = useInputValidator(toilet?.name ?? "", toiletValidator);

  const buildingValidator = (building: string) => BUILDING_REGEX.test(building);
  const [buildingName, setBuildingName, validBuildingName] = useInputValidator(
    toilet?.building ?? "",
    buildingValidator,
  );

  const floorValidator = (floor: string) => FLOOR_REGEX.test(floor);
  const [floor, setFloor, validFloor] = useInputValidator(toilet?.floor ?? "", floorValidator);

  const [submitting, setSubmitting] = useState<boolean>(false);

  const setDefaultValues = () => {
    setToiletName(toilet?.name ?? "");
    setBuildingName(toilet?.building ?? "");
    setFloor(toilet?.floor ?? "");
    moveTo(toilet?.location.latitude ?? INITIAL_COORDINATES.lat, toilet?.location.longitude ?? INITIAL_COORDINATES.lng);
  };

  const handleClose = () => {
    setDefaultValues();
    closeModal("toilet_modal", setOpen);
  };

  return (
    <dialog id="toilet_modal" className="modal overflow-y-auto" open={open}>
      <div className="modal-box m-auto h-[42rem] max-h-max w-[80vw] max-w-[80vw]">
        <h1 className="text-center text-3xl font-bold">{toilet ? "Edit" : "Create"} Toilet</h1>
        {submitting ? (
          <div className="my-12 flex justify-center">
            <Loading />
          </div>
        ) : (
          <>
            <div className="mt-2 flex h-64 w-full">
              <Map middle={true} />
            </div>
            <div className="flex flex-col">
              <label className="label pb-0.5 pt-2.5 font-bold">Name</label>
              <InputField
                type="toilet_name"
                value={toiletName}
                validValue={validToiletName}
                valuePlaceholder="Andrew N. Liveris Building, 5th Floor Bathroom"
                valueMaxLength={50}
                noInput={false}
                valueChange={(e) => setToiletName(e.target.value)}
              />
              <div className="flex flex-row justify-between space-x-4">
                <div className="flex w-[75%] flex-col">
                  <label className="label pb-0.5 pt-2.5 font-bold">Building Name</label>
                  <InputField
                    type="building_name"
                    value={buildingName}
                    validValue={validBuildingName}
                    valuePlaceholder="Andrew N. Liveris Building"
                    valueMaxLength={50}
                    noInput={false}
                    valueChange={(e) => setBuildingName(e.target.value)}
                  />
                </div>
                <div className="flex w-[25%] flex-col">
                  <label className="label pb-0.5 pt-2.5 font-bold">Building Floor</label>
                  <InputField
                    type="building_floor"
                    value={floor}
                    validValue={validFloor}
                    valuePlaceholder="3"
                    valueMaxLength={2}
                    noInput={false}
                    valueChange={(e) => setFloor(e.target.value)}
                  />
                </div>
              </div>
              <div className="flex flex-row justify-between space-x-4">
                <div className="flex grow flex-col">
                  <label className="label pb-0.5 pt-2.5 font-bold">Latitude</label>
                  <InputField
                    type="toilet_latitude"
                    value={lat.toString()}
                    validValue={true}
                    valuePlaceholder={INITIAL_COORDINATES.lat.toString()}
                    valueMaxLength={50}
                    noInput={true}
                    valueChange={(e) => e}
                  />
                </div>
                <div className="flex grow flex-col">
                  <label className="label pb-0.5 pt-2.5 font-bold">Longitude</label>
                  <InputField
                    type="toilet_longitude"
                    value={lng.toString()}
                    validValue={true}
                    valuePlaceholder={INITIAL_COORDINATES.lat.toString()}
                    valueMaxLength={50}
                    noInput={true}
                    valueChange={(e) => e}
                  />
                </div>
              </div>
              <hr className="my-2 border-t border-gray-700" />
              <label className="label pt-0 text-lg font-bold">Description</label>
              <TextEditor />
            </div>
            <div className="modal-action justify-center space-x-24">
              <button className="btn" onClick={handleClose}>
                Close
              </button>
            </div>
          </>
        )}
      </div>
    </dialog>
  );
};

export default ToiletModal;
