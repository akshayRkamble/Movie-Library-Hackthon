import { Select, Box } from '@chakra-ui/react';

export const REGIONS = [
  { code: 'all', name: 'All Regions' },
  { code: 'US', name: 'United States' },
  { code: 'IN', name: 'India' },
  { code: 'GB', name: 'United Kingdom' },
  { code: 'KR', name: 'South Korea' },
  { code: 'JP', name: 'Japan' },
  { code: 'FR', name: 'France' },
  { code: 'IT', name: 'Italy' },
  { code: 'ES', name: 'Spain' },
  { code: 'DE', name: 'Germany' },
  { code: 'CN', name: 'China' },
  { code: 'HK', name: 'Hong Kong' },
  { code: 'TW', name: 'Taiwan' },
  { code: 'BR', name: 'Brazil' },
  { code: 'MX', name: 'Mexico' },
  { code: 'RU', name: 'Russia' },
  { code: 'CA', name: 'Canada' },
  { code: 'AU', name: 'Australia' },
  { code: 'TR', name: 'Turkey' },
] as const;

interface RegionFilterProps {
  selectedRegion: string;
  onRegionChange: (region: string) => void;
}

export const RegionFilter = ({ selectedRegion, onRegionChange }: RegionFilterProps) => {
  return (
    <Box width={{ base: "100%", md: "200px" }}>
      <Select
        value={selectedRegion}
        onChange={(e) => onRegionChange(e.target.value)}
        bg="white"
        size="md"
        placeholder="Select Region"
      >
        {REGIONS.map((region) => (
          <option key={region.code} value={region.code}>
            {region.name}
          </option>
        ))}
      </Select>
    </Box>
  );
};