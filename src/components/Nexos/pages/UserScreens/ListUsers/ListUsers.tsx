import { useEffect, useState } from "react";
import {
  Avatar,
  Chip,
  FormControl,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { Link } from "react-router-dom";
import { TitleComponent, BreadCrumb, BasicDataTable, ConfirmationCardButton } from "../../../Global";
import { useFetch } from "../../../hooks/useFetch";

function capitalizeWords(str: string) {
  return str.toLowerCase().replace(/\b\w/g, (char) => char.toUpperCase());
}
/* Columns for the Data Table */
const columns: any[] = [
  {
    Header: "#",
    accessor: "",
    className: "wd-10p borderrigth",
    Cell: ({ row }: { row: any }) => {
      const { index } = row;
      // Adding 1 to the index to display the number starting from 1 instead of 0
      const consecutiveNumber = index + 1;
      return <span>{consecutiveNumber}</span>;
    },
  },
  {
    Header: "Avatar",
    accessor: "photo",
    className: "wd-10p borderrigth",
    Cell: ({ value }: any) => <Avatar alt="User Avatar" src={value} />,
  },
  {
    Header: "Nombre",
    accessor: "name",
    className: "wd-25p borderrigth",
    Cell: ({ value }: { value: string }) => (
      <span>{capitalizeWords(value)}</span>
    ),
  },
  {
    Header: "Perfil",
    accessor: "profiles",
    className: "wd-20p borderrigth",
    // Custom cell rendering to display status as a Chip component
    Cell: ({ value }: { value: any }) => {
      const [profileId, setProfileId] = useState(
        !value[0]?.profile_id ? 0 : value[0]?.profile_id
      );

      const handleChange = (event: SelectChangeEvent) => {
        setProfileId(event.target.value);
      };

      return value === null || value.length === 0 || !value ? (
        <span className="text-danger">Sin perfiles</span>
      ) : (
        <FormControl variant="standard" sx={{ minWidth: 130, width: "100%" }}>
          <Select
            labelId="profiles-simple-select-standard-label"
            id="demo-simple-select-standard"
            label="Perfiles"
            sx={{ color: "success.main" }}
            value={profileId}
            onChange={handleChange}
          >
            {value?.map((profile: any) => (
              <MenuItem key={profile.user_id} value={profile.profile_id}>
                {profile.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      );
    },
  },
  {
    Header: "Estado",
    accessor: "status_id",
    className: "wd-20p borderrigth",
    // Custom cell rendering to display status as a Chip component
    Cell: ({ value }: { value: number }) =>
      value === 1 ? (
        <Chip label="Activo" color="success" variant="outlined" />
      ) : (
        <Chip label="Inactivo" color="error" variant="outlined" />
      ),
  },
  {
    Header: "Accion",
    accessor: "",
    className: "wd-15p borderrigth",
    // Custom cell rendering for the "Accion" column with a link to edit the profile
    Cell: ({ row }: { row: any }) => {
      return (
        <Link
          to={`${process.env.PUBLIC_URL}/nexos/editarusuarios`}
          state={row.original}
        >
          <span className="material-icons md-5 md-dark">&#xe3c9;</span>
        </Link>
      );
    },
  },
];

const ListUsers = () => {
  const [data, setData] = useState<any>([]);
  const { getAllData, isLoading, error } = useFetch();

  useEffect(() => {
    const getData = async () => {
      try {
        const response: any = await getAllData("api/users");
        setData(response);
      } catch (error) {
        console.log("error", error);
      }
    };

    getData();
  }, []);

  return (
    <div>
      {/* Breadcrumb */}
      <BreadCrumb
        items={["inicio", "lista usuarios"]}
        baseURL={["inicio", "nexos/listarusuarios"]}
      />

      {/* Component Title */}
      <TitleComponent title={"LISTA DE USUARIOS"} />
      {
        (error) && (
          <ConfirmationCardButton
          baseURL='#'
          title='Error'
          subtitle={`${error?.message}`}
        />
        )
      }
      {
      /* Data Grid Table */
        (!error) && (
          <BasicDataTable
          columns={columns}
          data={data}
          addButtonLink={`${process.env.PUBLIC_URL}/nexos/crearusuarios`}
          isLoading={isLoading}
        />
        )
      }
    </div>
  );
};

export default ListUsers;
