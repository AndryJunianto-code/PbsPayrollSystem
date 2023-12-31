import {
  Modal,
  Box,
  FormControl,
  InputLabel,
  Stack,
  TextField,
  Typography,
  OutlinedInput,
  InputAdornment,
  Button,
} from "@mui/material";
import { useState, useEffect } from "react";
import { basicModalStyle } from "../../assets/styles/styles";
import { useMutation } from "react-query";
import { updatePosition } from "../../requests/positionRequest";

const UpdatePositionModal = ({
  openPosUpdateModal,
  handleClosePosUpdateModal,
  refetchPosition,
  data,
}) => {
  const initialState = {
    title: "",
    salary: "",
    target: 0,
    promotionTarget: 0,
    monthlyCommisionFirstTier: 0,
    monthlyCommisionSecondTier: 0,
    quarterBonusFirstTier: 0,
    quarterBonusSecondTier: 0,
  };
  const initialFieldError = { title: false, salary: false };
  const [input, setInput] = useState(initialState);
  const [fieldError, setFieldError] = useState(initialFieldError);
  const handleInput = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };
  const validateField = () => {
    const errors = {};
    if (input.title.toString().trim() === "") {
      errors.title = true;
    }
    if (input.rank.toString().trim() === "") {
      errors.rank = true;
    }
    if (input.salary.toString().trim() === "" || parseInt(input.salary) <= 0) {
      errors.salary = true;
    }
    return errors;
  };

  const { mutate: mutatePosition } = useMutation(updatePosition);
  const handleUpdatePosition = (e) => {
    const errors = validateField();
    setFieldError(errors);
    const hasErrors = Object.values(errors).some((error) => error === true);

    if (!hasErrors) {
      e.preventDefault();
      const {
        title,
        rank,
        salary,
        target,
        promotionTarget,
        monthlyCommisionFirstTier,
        monthlyCommisionSecondTier,
        quarterBonusFirstTier,
        quarterBonusSecondTier,
      } = input;
      mutatePosition(
        {
          id: data?.id,
          title,
          rank,
          salary,
          target,
          promotionTarget,
          monthlyCommisionFirstTier,
          monthlyCommisionSecondTier,
          quarterBonusFirstTier,
          quarterBonusSecondTier,
        },
        {
          onSuccess: () => {
            refetchPosition();
            handleClosePosUpdateModal();
            setInput(initialState);
          },
        }
      );
    }
  };

  useEffect(() => {
    if (data !== null) setInput(data);
    return () => {
      setInput(initialState);
      setFieldError(initialFieldError);
    };
  }, [data]);
  return (
    <Modal
      open={openPosUpdateModal}
      onClose={handleClosePosUpdateModal}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={basicModalStyle}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Update Position
        </Typography>
        <Box mt="2rem">
        <Stack direction="row" my="2rem" flex={5}>
            <TextField
              required
              error={fieldError.title}
              id="outlined-required"
              label="Title"
              name="title"
              onChange={handleInput}
              sx={{ flex: 3, mr: "1rem" }}
              value={input.title}
            />
            <TextField
              required
              error={fieldError.rank}
              id="outlined"
              label="Rank"
              type="number"
              onChange={handleInput}
              name="rank"
              sx={{ flex: 2 }}
              value={input.rank}
            />
          </Stack>
          <Stack direction="row" my="2rem" flex={5}>
            <FormControl
              required
              sx={{ flex: 2 }}
              onChange={handleInput}
              error={fieldError.salary}
            >
              <InputLabel htmlFor="outlined-adornment-amount">
                Salary
              </InputLabel>
              <OutlinedInput
                type="number"
                id="outlined-adornment-amount"
                startAdornment={
                  <InputAdornment position="start">Rp</InputAdornment>
                }
                label="Amount"
                name="salary"
                value={input.salary}
              />
            </FormControl>
            <FormControl sx={{ flex: 2, mx: "1rem" }} onChange={handleInput}>
              <InputLabel htmlFor="outlined-adornment-amount">
                Target
              </InputLabel>
              <OutlinedInput
                type="number"
                id="outlined-adornment-amount"
                startAdornment={
                  <InputAdornment position="start">$</InputAdornment>
                }
                label="Amount"
                name="target"
                value={input.target}
              />
            </FormControl>
            <TextField
              id="outlined"
              label="Promotion"
              type="number"
              name="promotionTarget"
              onChange={handleInput}
              value={input.promotionTarget}
              sx={{ flex: 1 }}
            />
          </Stack>
          <Stack direction="row">
            <TextField
              id="outlined"
              label="1st Tier Comm"
              type="number"
              onChange={handleInput}
              value={input.monthlyCommisionFirstTier}
              name="monthlyCommisionFirstTier"
            />
            <TextField
              id="outlined"
              label="2nd Tier Comm"
              type="number"
              onChange={handleInput}
              value={input.monthlyCommisionSecondTier}
              name="monthlyCommisionSecondTier"
              sx={{ mx: "1rem" }}
            />
            <TextField
              id="outlined"
              label="1st Tier Quarter"
              type="number"
              onChange={handleInput}
              value={input.quarterBonusFirstTier}
              name="quarterBonusFirstTier"
              sx={{ mr: "1rem" }}
            />
            <TextField
              id="outlined"
              label="2nd Tier Quarter"
              type="number"
              onChange={handleInput}
              value={input.quarterBonusSecondTier}
              name="quarterBonusSecondTier"
            />
          </Stack>
        </Box>
        <Button
          onClick={handleUpdatePosition}
          variant="contained"
          sx={{ float: "right", mt: "3rem" }}
        >
          Update
        </Button>
      </Box>
    </Modal>
  );
};

export default UpdatePositionModal;
