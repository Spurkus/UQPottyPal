import { InputDropdownField, InputField } from "@/components/InputFields";
import useInputValidator from "@/hooks/useInputValidator";
import { Building, Toilet } from "@/types";
import { useState, useEffect, useCallback } from "react";
import Loading from "@/components/Loading";
import { closeModal, getIDFromBuildingName } from "@/helper/helperFunctions";
import { useMap } from "@/contexts/MapContext";
import Map from "@/components/Map";
import TextEditor from "@/components/TextEditor";
import buildings from "@/buildings.json";

interface ToiletModalProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  toilet?: Toilet;
}

const INITIAL_COORDINATES = { lng: 153.01301, lat: -27.49748, zoom: 16 };
const TOILET_NAME_REGEX = /^[A-Za-z0-9\s,.'-]{1,50}$/;
const FLOOR_REGEX = /^[0-9a-zA-Z]{1,2}$/;

const ToiletModal = ({ open, setOpen, toilet }: ToiletModalProps) => {
  const { moveTo, lat, lng } = useMap();
  const toiletValidator = (name: string) => TOILET_NAME_REGEX.test(name);
  const [toiletName, setToiletName, validToiletName] = useInputValidator(toilet?.name ?? "", toiletValidator);

  const buildingData: Record<string, Building> = buildings;
  const buildingNames = Object.values(buildingData).map((building) => building.name);

  const buildingValidator = useCallback(
    (building: string) => buildingNames.some((name) => name.startsWith(building)),
    [buildingNames],
  );
  const [buildingName, setBuildingName, validBuildingName] = useInputValidator(
    toilet?.building ?? "",
    buildingValidator,
  );

  const floorValidator = (floor: string) => FLOOR_REGEX.test(floor);
  const [floor, setFloor, validFloor] = useInputValidator(toilet?.floor ?? "", floorValidator);

  const [submitting, setSubmitting] = useState<boolean>(false);

  const moveToBuilding = (buildingName: string) => {
    setBuildingName(buildingName);
    const buildingID = getIDFromBuildingName(buildingName);
    if (!buildingID) return;
    const building = buildingData[buildingID];
    moveTo(building.latitude, building.longitude);
  };

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
    <dialog id="toilet_modal" className="modal" open={open}>
      <div className="modal-box m-auto w-[85vw] max-w-none">
        <h1 className="text-center text-3xl font-bold">{toilet ? "Edit" : "Create"} Toilet</h1>
        {submitting ? (
          <div className="my-12 flex justify-center">
            <Loading />
          </div>
        ) : (
          <>
            <div className="flex h-full flex-row space-x-4">
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
                  <div className="flex w-[83%] flex-col">
                    <label className="label pb-0.5 pt-2.5 font-bold">Building Name</label>
                    <InputDropdownField
                      type="building_name"
                      value={buildingName}
                      validValue={validBuildingName}
                      valuePlaceholder="Andrew N. Liveris (46)"
                      valueMaxLength={50}
                      noInput={false}
                      valueChange={(e) => setBuildingName(e.target.value)}
                      setValue={moveToBuilding}
                      list={buildingNames}
                    />
                  </div>
                  <div className="flex w-[17%] flex-col">
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
              <div className="mt-2 flex min-h-[70vh] w-full">
                <Map middle={true} />
              </div>
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
