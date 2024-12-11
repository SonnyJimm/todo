export const BoardStyle = {
  boardHeader: { display: "flex", flexDirection: "row" },
  titleWrapper: {
    display: "flex",
    flex: 1,
    alignItems: "flex-end",
  },
  actionsWrapper: { display: "flex", flexDirection: "row-reverse" },
  card: {
    cursor: "move",
    "&:hover": {
      boxShadow: 3,
    },
  },
  contentWrapper: { display: "flex", alignItems: "flex-start", gap: 1 },
};
