import { styled } from '../stitches.config'

export interface TableProps {
  twoColumns?: boolean
  rightAlign?: boolean
  data: [React.ReactNode, React.ReactNode][]
}

export function Table({ twoColumns, rightAlign, data }: TableProps) {
  return (
    <DataTableContainer twoColumns={twoColumns}>
      <DataTableTable>
        <tbody>
          {data.map(([title, content], idx) => {
            if (!content) return null

            return (
              <tr key={idx}>
                <DataTableTh scope="row">{title}</DataTableTh>
                <DataTableTd rightAlign={rightAlign}>{content}</DataTableTd>
              </tr>
            )
          })}
        </tbody>
      </DataTableTable>
    </DataTableContainer>
  )
}

const DataTableContainer = styled('div', {
  boxSizing: 'border-box',
  minWidth: 0,
  margin: 0,
  columnGap: '$5',
  columnRuleStyle: 'solid',
  columnRuleColor: 'rgba(255,255,255,.12)',
  columnRuleWidth: '1px',
  variants: {
    twoColumns: {
      true: {
        columnCount: 2,
      },
    },
  },
})

const DataTableTable = styled('table', {
  boxSizing: 'border-box',
  borderCollapse: 'collapse',
  width: '100%',
  margin: 0,
})

const DataTableTh = styled('th', {
  width: 'fit-content',
  textAlign: 'left',
  textStyle: '$h3',
  overflow: 'hidden',
  whiteSpace: 'nowrap',
  textOverflow: 'ellipsis',
})

const DataTableTd = styled('td', {
  width: 'fit-content',
  textAlign: 'left',
  textStyle: '$body',
  overflow: 'hidden',
  whiteSpace: 'nowrap',
  textOverflow: 'ellipsis',
  variants: {
    rightAlign: {
      true: {
        textAlign: 'right',
      },
    },
  },
})
