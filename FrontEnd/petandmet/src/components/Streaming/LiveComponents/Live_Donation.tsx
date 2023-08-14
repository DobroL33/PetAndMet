import React, { useEffect, useState } from "react";
import axios from "axios";
import { domain } from "hooks/customQueryClient";
import useAnimal from "hooks/Animal/useAnimal";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import Stack from "@mui/material/Stack";
import Live_ItemStatus from "./Live_ItemStatus";

interface CenterItem {
  center_item_id: number;
  center_uuid: string;
  item_name: string;
  item_target_price: number;
  item_url: string | null;
}

function Live_Donation() {
  const [centerItem, setCenterItem] = useState<CenterItem[]>([]);
  const initialOptions = ["후원하실 옵션을 선택해주세요 !"];

  const [selectedIndex, setSelectedIndex] = React.useState(0); // 초기 값 변경
  const [itemNames, setItemNames] = useState<string[]>([]); // 아이템 이름만을 포함하는 상태 변수
  const [selectedItem, setSelectedItem] = useState<CenterItem | null>(null);
  const { animalData } = useAnimal();
  const center_uuid = animalData.center_uuid;

  // UI 디자인 요소
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const open = Boolean(anchorEl);
  const handleClickListItem = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuItemClick = (
    event: React.MouseEvent<HTMLElement>,
    index: number
  ) => {
    setSelectedIndex(index);
    setAnchorEl(null);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  // MUI 메뉴 바 옵션들
  const defaultProps = {
    options: centerItem, // 이 부분 변경
    getOptionLabel: (option: CenterItem) => option.item_name,
  };
  const [value, setValue] = React.useState<CenterItem | null>(null);

  // API 요청
  useEffect(() => {
    const url = `${domain}/center/item?uuid=${center_uuid}`;
    axios
      .get(url)
      .then((response) => {
        const centerItems = response.data.response.centerItems;
        setCenterItem(centerItems);
        const names = centerItems.map((item: CenterItem) => item.item_name);
        setItemNames([...initialOptions, ...names]);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [center_uuid]);

  return (
    <Stack spacing={1} sx={{ width: 250, margin: 2 }}>
      <Autocomplete
        options={centerItem}
        getOptionLabel={(option: CenterItem) => option.item_name}
        onChange={(event, newValue) => setSelectedItem(newValue)}
        id="disable-close-on-select"
        autoSelect
        renderInput={(params) => (
          <TextField
            {...params}
            label="후원할 물품을 선택해주세요"
            variant="standard"
          />
        )}
      />
      <Live_ItemStatus
        itemTargetPrice={selectedItem?.item_target_price ?? 0}
        centerItemId={selectedItem?.center_item_id ?? 0} // 이 부분이 선택된 아이템의 center_item_id를 전달합니다.
      />
    </Stack>
  );
}

export default Live_Donation;
