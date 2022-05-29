import {useEffect, useState} from "react";
import {SPECIALIZATIONS} from '../specialisations'
import {specializationJobs} from '../specializationJobs'
import { styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import ProfessionsList from "../components/ProfessionsList";
import axios from 'axios';
import {API_URL} from "../api/api";

import {
  Autocomplete, Button,
  Checkbox,
  FormControl,
  InputLabel,
  ListItemText,
  MenuItem,
  OutlinedInput,
  Select,
  TextField,
} from "@mui/material";


const flags = {
  "official": "Официальное трудоустройство",
  "living": "Проживание",
  "vacation": "Оплачиваемый отпуск",
  "coworkers": "Дружный коллектив",
  "office": "Достойный офис",
  "education": "Обучение",
  "salary": "Стабильная заработная плата",
  "location": "Расположение",
  "extra": "Дополнительные выплаты",
  "growth": "Возможность развиваться",
  "tasks": "Интересные задачи",
  "dms": "ДМС",
  "social": "Социальный пакет",
  "discount": "Корпоративные скидки",
  "hours": "График",
  "disko": "Мероприятия",
  "food": "Питание",
  "remote": "Удаленная работa",
  "drive": "Проезд",
  "hotel": "Путевка",
  "tech": "Оборудование",
  "clothes": "Одежда",
  "sport": "Спорт"
}

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const Home = () => {
  const [jobsById, setJobsById] = useState({})
  const [areas, setAreas] = useState([])
  const [allSpecks, setAllSpecks] = useState([])

  const [selectedSpec, setSelectedSpec] = useState(undefined)
  const [selectedFlags, setSelectedFlags] = useState([])
  const [selectedArea, setSelectedArea] = useState('')
  const [searchString, setSearchString] = useState('')

  const [filteredJobs, setFilteredJobs] = useState([])

  const filterData = (query, data) => {
    if (!query) {
      return data;
    } else {
      return data.filter((job) => job.name.toLowerCase().includes(query))
    }
  };
  const dataFiltered = filterData(searchString, filteredJobs)

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setSelectedFlags(value)
  };

  const handleAreaChange = (value) => {
    setSelectedArea(value.id)
  }

  const handleSpecChange = (value) => {
    setSelectedSpec(value.id)
  }

  async function getAllSpecs() {
    const response = await axios.get(`${API_URL}/specializations`)

    if (response.status === 200) {
      setAllSpecks(response.data)
    }
  }

  async function getAreas() {
    const response = await axios.get(`${API_URL}/vacancies/areas`)

    if (response.status === 200) {
      setAreas(response.data)
    }
  }

  async function getFilteredJobs() {
    const params = {
      area_id: selectedArea,
      specialization_id: selectedSpec,
      bonuses: selectedFlags.join()
    }

    const response = await axios.get(`${API_URL}/vacancies`, { params })

    if (response.status === 200) {
      setFilteredJobs(response.data)
    }
  }

  useEffect(()=> {
    getAllSpecs()
    getAreas()
  },[])

  return (
    <div style={{display: 'flex', flexDirection: 'column', width: '90%', alignItems: 'center'}}>
      <TextField
        id="outlined-basic"
        label="Введите вакансию"
        variant="outlined"
        style={{minWidth: 600, marginBottom: 20, marginTop: 40}}
        value={searchString}
        onChange={(ev) => setSearchString(ev.target.value)}
      />

      <FormControl>
        <Autocomplete
          disablePortal
          id="combo-box-demo"
          options={allSpecks}
          style={{minWidth: 600, marginBottom: 20}}
          sx={{ width: 300 }}
          renderInput={(params) => <TextField {...params} label="Специализация" />}
          onChange={(_,value) => handleSpecChange(value)}
        />
      </FormControl>

      <FormControl>
      <InputLabel id="tags">Тэги</InputLabel>
      <Select
        labelId="tags"
        id="tags"
        multiple
        value={selectedFlags}
        onChange={(handleChange)}
        input={<OutlinedInput label="Теги" />}
        renderValue={(selected) => selected.map(item => flags[item]).join(', ')}
        MenuProps={MenuProps}
        label="Тэги"
        style={{maxWidth: 600, marginBottom: 20, width: 600}}
      >
        {Object.keys(flags).map((key) => (
          <MenuItem key={key} value={key}>
            <Checkbox checked={selectedFlags.indexOf(key) > -1} />
            <ListItemText primary={flags[key]} />
          </MenuItem>
        ))}
      </Select>
    </FormControl>

      <FormControl>
        <Autocomplete
          disablePortal
          id="combo-box-demo"
          options={areas}
          style={{minWidth: 600, marginBottom: 20}}
          sx={{ width: 300 }}
          renderInput={(params) => <TextField {...params} label="Регион" />}
          onChange={(_,value) => handleAreaChange(value)}
        />
    </FormControl>

      <Button onClick={getFilteredJobs}>Найти вакансии</Button>

      {!filteredJobs.length ? <div style={{ marginTop: 30 }}>Похоже таких ваканский нет</div> : <ProfessionsList filtered={dataFiltered} />}
    </div>
  )
}

export default Home
