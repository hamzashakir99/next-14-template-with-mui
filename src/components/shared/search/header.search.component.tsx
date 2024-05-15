'use client';

import React, { useEffect, useState, ChangeEvent } from 'react';
import { Box, CircularProgress, InputAdornment, OutlinedInput } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useDebounce } from '@uidotdev/usehooks';

interface IProps {
  fetchData: (search: string) => void;
}

export const HeaderSearchComponent = ({ fetchData }: IProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [call, setCall] = useState<boolean>(false);
  const [isSearching, setIsSearching] = useState(false);

  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCall(true);
    setSearchTerm(e.target.value);
  };

  useEffect(() => {
    const searchHN = async () => {
      setIsSearching(true);
      fetchData(debouncedSearchTerm);
      setIsSearching(false);
    };
    if (call) {
      searchHN();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedSearchTerm]);
  return (
    <Box component={'form'}>
      <OutlinedInput
        startAdornment={
          <InputAdornment position='start'>
            <SearchIcon />
          </InputAdornment>
        }
        endAdornment={
          <InputAdornment position='end'>{isSearching ? <CircularProgress size={'small'} /> : null}</InputAdornment>
        }
        aria-describedby='outlined-weight-helper-admin-branch-search'
        inputProps={{
          'aria-label': 'weight'
        }}
        type='search'
        placeholder='Search...'
        fullWidth
        autoComplete='off'
        value={searchTerm}
        onChange={handleChange}
      />
    </Box>
  );
};
