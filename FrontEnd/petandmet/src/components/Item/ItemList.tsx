import { useState, useEffect } from "react";
import {
  Grid,
  Box,
  Typography,
  Skeleton,
  Container,
  FormControl,
  InputLabel,
  MenuItem,
} from "@mui/material";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import pay from "images/kakaopay.png";
import CenterDataList from "hooks/Center/CenterMutation";
import axios from "axios";
import { domain } from "hooks/customQueryClient";
import { useNavigate } from "react-router-dom";

interface CenterItem {
  center_item_id: number;
  center_uuid: string;
  item_name: string;
  item_target_price: number;
  item_url: string | null;
}

function List() {
  const [center, setCenter] = useState("");
  const [uid, setUid] = useState("");
  const navigate = useNavigate();

  const goToItemDetail = (item: CenterItem) => {
    navigate(`/donate/item/${uid}`, { state: item });
  };

  const handleChange = (event: SelectChangeEvent) => {
    setCenter(event.target.value);
  };

  const [centers, setCenters] = useState<string[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const centersData = await CenterDataList();
      setCenters(centersData);
      console.log("아이템 리스트에서 center");
      console.log(center);
    };
    fetchData();
  }, []);

  const [centerItem, setCenterItem] = useState<CenterItem[]>([]);

  const CenterItemList = async () => {
    try {
      const res = await axios.get(`${domain}/center/item?uuid=${uid}`);
      console.log(res);
      const centerItem = res.data.response.centerItems;
      console.log("아이템리스트 centerItem");
      console.log(centerItem);
      return centerItem;
    } catch (error) {
      console.log(error);
      return [];
    }
  };

  useEffect(() => {
    const fetchItem = async () => {
      const centersItem = await CenterItemList();
      setCenterItem(centersItem);
      console.log(centerItem);
    };
    fetchItem();
  }, [uid]);

  if (centerItem.length !== 0) {
    return (
      <Container>
        <div style={{ padding: 20 }}>
          <Typography
            variant="h4"
            style={{ color: "#FFA629", fontWeight: "bold" }}
          >
            후원 물품 목록
          </Typography>
        </div>

        <div style={{ display: "flex", justifyContent: "flex-start" }}>
          <FormControl sx={{ width: "25%" }}>
            <InputLabel id="demo-simple-select-label">보호소</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={center}
              label="보호소"
              onChange={handleChange}
            >
              {centers.map((cent: any) => (
                <MenuItem value={cent.uuid} onClick={() => setUid(cent.uuid)}>
                  {cent.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>

        {/* 보호소 아이디에 해당하는 물품 map을 통해 보여주기 */}

        <Grid container spacing={2}>
          {centerItem.map((item, index) => (
            <Grid key={index} item xs={12} sm={6} md={3}>
              <Box sx={{ width: "100%", my: 5 }}>
                {item ? (
                  <img
                    style={{ width: "100%", height: 200, objectFit: "cover" }}
                    alt={pay}
                    src={pay}
                    onClick={() => {
                      goToItemDetail(item);
                    }}
                  />
                ) : (
                  <Skeleton variant="rectangular" width="100%" height={200} />
                )}
                {item ? (
                  <Box sx={{ pr: 2 }}>
                    <Typography gutterBottom variant="body2">
                      {item.item_name}
                    </Typography>
                    <Typography
                      display="block"
                      variant="caption"
                      color="text.secondary"
                    >
                      {item.item_target_price}
                    </Typography>
                  </Box>
                ) : (
                  <Box sx={{ pt: 0.5 }}>
                    <Skeleton />
                    <Skeleton width="60%" />
                  </Box>
                )}
              </Box>
            </Grid>
          ))}
        </Grid>
      </Container>
    );
  } else {
    return (
      <>
        <div style={{ padding: 20 }}>
          <Typography
            variant="h4"
            style={{ color: "#FFA629", fontWeight: "bold" }}
          >
            후원 물품 목록
          </Typography>
        </div>
        <div style={{ display: "flex", justifyContent: "flex-start" }}>
          <FormControl sx={{ width: "25%" }}>
            <InputLabel id="demo-simple-select-label">보호소</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={center}
              label="보호소"
              onChange={handleChange}
            >
              {centers.map((cent: any) => (
                <MenuItem value={cent.uuid} onClick={() => setUid(cent.uuid)}>
                  {cent.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>

        <h1>등록된 후원 물품이 없습니다.</h1>
      </>
    );
  }
}
function ItemList() {
  return (
    <Box sx={{ overflow: "hidden" }}>
      <List />
    </Box>
  );
}
export default ItemList;
export {};
