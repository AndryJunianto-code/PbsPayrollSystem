import { Modal } from "@mui/material";
import React from "react";
import { basicModalStyle } from "../../assets/styles/styles";

const UpdatePositionModal = () => {
  return (
    <Modal
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={basicModalStyle}>
      <Typography id="modal-modal-title" variant="h6" component="h2">
          Update Position
        </Typography>
        <Box mt="2rem">
          <TextField
            required
            fullWidth
            error={fieldError.title}
            id="outlined-required"
            label="Title"
            name="title"
            onChange={handleInput}
          />
          <Stack direction="row" my="2rem" flex={5}>
            <FormControl required sx={{ flex: 2 }} onChange={handleInput} error={fieldError.salary}>
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
                name='salary'
              />
            </FormControl>
            <FormControl sx={{ flex:2,mx:'1rem' }} onChange={handleInput}>
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
                name='target'
              />
            </FormControl>
            <TextField
              id="outlined"
              label="Promotion"
              type="number"
              name="promotionTarget"
              onChange={handleInput}
              sx={{flex:1}}
            />
          </Stack>
          <Stack direction="row">
            <TextField
              id="outlined"
              label="1st Tier Comm"
              type="number"
              onChange={handleInput}
              name='monthlyCommisionFirstTier'
            />
            <TextField
              id="outlined"
              label="2nd Tier Comm"
              type="number"
              onChange={handleInput}
              name='monthlyCommisionSecondTier'
              sx={{ mx: "1rem" }}
            />
            <TextField
              id="outlined"
              label="1st Tier Quarter"
              type="number"
              onChange={handleInput}
              name='quarterBonusFirstTier'
              sx={{ mr: "1rem" }}
            />
            <TextField
              id="outlined"
              label="2nd Tier Quarter"
              type="number"
              onChange={handleInput}
              name='quarterBonusSecondTier'
            />
          </Stack>
        </Box>
      </Box>
    </Modal>
  );
};

export default UpdatePositionModal;
