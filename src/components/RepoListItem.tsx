import { Link } from "react-router-dom";
import { ListItem, ListItemText } from "@mui/material";
import type { RepoListItemProps } from "../types/IListItems";

export default function RepoListItem({ repo }: RepoListItemProps) {
  return (
    <ListItem>
      <ListItemText
        primary={
          <Link to={`/${repo.name}`}>
            {repo.name}
          </Link>
        }
        secondary={repo.description}
      />
    </ListItem>
  );
}