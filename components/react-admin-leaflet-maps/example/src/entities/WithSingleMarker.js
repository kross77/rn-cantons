import React from 'react';
import {
  List,
  Datagrid,
  TextField,
  Edit,
  SimpleForm,
  TextInput,
  NumberInput,
  Create,
  Show,
  SimpleShowLayout,
  EditButton,
} from 'react-admin';
import { LeafletMapInput, LeafletMapField } from '@rn-cantons/ra-leaflet-maps-input';

export const EntityList = props => (
  <List {...props}>
    <Datagrid rowClick="show">
      <TextField source="id" />
      <TextField source="name" />
      <EditButton />
    </Datagrid>
  </List>
);

export const EntityEdit = props => (
  <Edit {...props}>
    <SimpleForm>
      <TextInput source="id" />
      <TextInput source="name" />
      <LeafletMapInput
        source="coordinates"
        searchable
      />
    </SimpleForm>
  </Edit>
);

export const EntityShow = props => (
  <Show {...props}>
    <SimpleShowLayout>
        <TextField source="id" />
        <TextField source="name" />
        <LeafletMapField
          source="coordinates"
        />
    </SimpleShowLayout>
  </Show>
)

export const EntityCreate = props => (
  <Create {...props}>
    <SimpleForm>
      <NumberInput source="id" />
      <TextInput source="name" />
      <LeafletMapInput
        source="coordinates"
        searchable
      />
    </SimpleForm>
  </Create>
);