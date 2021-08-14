import { Box, Radio, RadioGroup, Typography } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Checkbox from "@material-ui/core/Checkbox";
import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormGroup from "@material-ui/core/FormGroup";
import FormLabel from "@material-ui/core/FormLabel";
import MobileStepper from "@material-ui/core/MobileStepper";
import { useTheme } from "@material-ui/core/styles";
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";
import useQuerySubject from "@question-app/src/hooks/useQuerySubject";
import React from "react";

export default function Index() {
  const theme = useTheme();
  const {
    state,
    handleCheckItem,
    handleNext,
    handlePrev,
    isEnding,
    isBeginning,
    maxStep,
  } = useQuerySubject();

  const queryItem = state.queryItems[state.currentItem];

  return (
    <Box>
      <Typography>{state.title}</Typography>
      <Typography>현재 문항: {state.currentItem + 1} / { maxStep }</Typography>
      <MobileStepper
        variant="progress"
        steps={maxStep}
        position="static"
        activeStep={state.currentItem}
        // className={classes.root}
        backButton={
          <Button size="small" onClick={handlePrev} disabled={isBeginning}>
            {theme.direction === "rtl" ? (
              <KeyboardArrowRight />
            ) : (
              <KeyboardArrowLeft />
            )}
            Back
          </Button>
        }
        nextButton={
          <Button size="small" onClick={handleNext} disabled={isEnding}>
            Next
            {theme.direction === "rtl" ? (
              <KeyboardArrowLeft />
            ) : (
              <KeyboardArrowRight />
            )}
          </Button>
        }
      />
      {queryItem.isPickOne ? (
        <FormControl component="fieldset">
          <FormLabel component="legend">{queryItem.question}</FormLabel>
          <RadioGroup
            aria-label={queryItem.question}
            name={queryItem.question}
            value={queryItem.checkedAnswerId}
            onChange={(e) => {
              handleCheckItem({
                queryItemId: queryItem.id,
                answerId: Number(e.target.value),
              });
            }}
          >
            {queryItem.answers.map((answer) => (
              <FormControlLabel
                key={`answer_${answer.id}`}
                control={<Radio />}
                value={answer.id}
                label={answer.text}
              />
            ))}
          </RadioGroup>
        </FormControl>
      ) : (
        <FormControl component="fieldset">
          <FormLabel component="legend">{queryItem.question}</FormLabel>
          <FormGroup>
            {queryItem.answers.map((answer) => (
              <FormControlLabel
                key={`answer_${answer.id}`}
                control={
                  <Checkbox
                    checked={answer.isChecked}
                    onChange={() => {
                      handleCheckItem({
                        queryItemId: queryItem.id,
                        answerId: answer.id,
                      });
                    }}
                    name={answer.text}
                  />
                }
                label={answer.text}
              />
            ))}
          </FormGroup>
        </FormControl>
      )}
      <Typography>답변목록: </Typography>
      {state.queryItems
        .filter((item) => item.isAnswered)
        .map((item) => (
          <Typography key={`picked_answers_${item.id}`}>
            {item.question}: {item.pickedAnswers.map((v) => v.text).join(", ")}
          </Typography>
        ))}
    </Box>
  );
}
