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
  EditButton,
  Show,
  SimpleShowLayout,
} from 'react-admin';

import { LeafletMapInput, LeafletMapField } from '@rn-cantons/ra-leaflet-maps-input';

export const ListEntity = props => {
  return (
    <List {...props} >
      <Datagrid rowClick="show">
        <TextField source="id" />
        <TextField source="name" />
        <EditButton />
      </Datagrid>
    </List>
  )
};

export const EditEntity = props => (
  <Edit {...props}>
    <SimpleForm>
      <TextInput source="id" />
      <TextInput source="name" />
      <LeafletMapInput
        multipleMarkers
        source="coordinates"
      />
    </SimpleForm>
  </Edit>
);

export const ShowEntity = props => (
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

export const CreateEntity = props => (
  <Create {...props}>
    <SimpleForm>
      <NumberInput source="id" />
      <TextInput source="name" />
      <LeafletMapInput
        multipleMarkers
        source="coordinates"
      />
    </SimpleForm>
  </Create>
);